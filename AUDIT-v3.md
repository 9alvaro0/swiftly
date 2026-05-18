# AUDIT v3 - Comprehensive Quality Audit

**Date:** 2026-02-14
**Scope:** Full codebase audit post Fases 1-3 remediation
**Auditors:** 6 specialized agents (Security, Performance, SEO, Accessibility, Code Quality, Firebase)

---

## Summary

| Category | CRITICAL | HIGH | MEDIUM | LOW | Total |
|----------|----------|------|--------|-----|-------|
| Security | 2 | 3 | 4 | 2 | 11 |
| Performance | - | 6 | 9 | 5 | 20 |
| SEO | - | 6 | 8 | 7 | 21 |
| Accessibility | - | 10 | 24 | 6 | 40 |
| Code Quality | - | 5 | 11 | 7 | 23 |
| Firebase/Data | 3 | 4 | 7 | 5 | 19 |
| **Total** | **5** | **34** | **63** | **32** | **134** |

> After deduplication of overlapping findings across agents. Original raw count was ~149.

---

## FALSE POSITIVES (excluded from counts)

### FP-01 | CQ-02 | Non-null assertions on firebaseConfig.ts
The agent recommends `requireEnv()` pattern, but this was already tried and **broke the app**. Next.js requires static `process.env.NEXT_PUBLIC_*` access for compile-time inlining. Dynamic access via `process.env[name]` does NOT work on client-side. The `!` assertions are the correct pattern here.

---

## DEDUPLICATED ITEMS (counted once under primary category)

| Finding | Appears in | Counted under |
|---------|-----------|---------------|
| In-memory rate limiting ineffective | SEC-01, FB-17 | Security |
| Admin APIs no pagination | SEC-09, FB-05, PERF-05 | Firebase |
| Role persisted in localStorage | SEC-03, FB-25 | Security |
| Sitemap uses client SDK | PERF-01, SEO-21, FB-11 | Performance |
| Post views no dedup | SEC-10, FB-20 | Firebase |
| Dead/unused functions | CQ-08, FB-15, FB-16 | Code Quality |

---

## CRITICAL (5)

### C-01 | Security | In-memory rate limiting ineffective in serverless
**File:** `src/proxy.ts:7`
**Description:** Rate limiting uses a local `Map<string, ...>` in process memory. In serverless (Vercel), each cold start gets a fresh Map. Multiple instances don't share memory. All rate limits are effectively unenforced.
**Fix:** Integrate distributed rate limiter backed by Redis/Upstash (`@upstash/ratelimit`).

### C-02 | Security | Firestore contact `notSpamming()` is a no-op
**File:** `firebase/firestore.rules:311-312`
**Description:** `notSpamming()` always returns `true`. Combined with C-01, public endpoints have zero abuse prevention.
**Fix:** Implement Firestore-level rate limiting or ensure server-side API enforces rate limiting with persistent store.

### C-03 | Firebase | Security rules `getUserRole()` reads Firestore on every evaluation
**File:** `firebase/firestore.rules:25-28`
**Description:** `getUserRole()` calls `get()` to read users document on every rule evaluation. Firestore counts each `get()` as a billed read. Hard limit of 10 `get()` calls per evaluation. Multiple rules chaining `isAdmin()/isEditor()/isAuthor()` can trigger multiple reads for the same document.
**Fix:** Switch to custom claims: `return request.auth.token.role`. Project already sets custom claims in `src/lib/claims.ts`.

### C-04 | Firebase | Storage rules rely on claims that are only synced opportunistically
**Files:** `firebase/storage.rules:13-14,23-27`, `src/lib/auth.ts:71-74`
**Description:** Storage rules check `request.auth.token.role` but claims are only synced in `verifyAdminToken()` for admin users. Non-admin roles (editor, author) may never get claims synced.
**Fix:** Call `syncCustomClaims()` during all role assignments. Force token refresh on client after role changes.

### C-05 | Firebase | Contact form has no server-side Firestore write
**File:** `src/app/api/contact/route.ts`
**Description:** Contact API only sends emails, never writes to Firestore. If email service fails, messages are permanently lost.
**Fix:** Persist contact submission via Admin SDK before attempting email delivery.

---

## HIGH (34)

### Security HIGH (3)

#### H-01 | Auth role in localStorage trusted for admin UI gating
**Files:** `src/store/authStore.ts:59-73`, `src/components/auth/ProtectedRoute.tsx:38,81`
**Description:** `role` persisted in localStorage can be modified by attacker to access admin UI (though API calls would fail with 401/403). Exposes admin UI structure and component names.
**Fix:** Don't persist `role` in localStorage, or add `/api/me` endpoint for server-side role validation.

#### H-02 | Tag deletion uses client SDK without server-side API
**File:** `src/services/firebase/firestore/tags.ts:150-161`
**Description:** Tag deletion goes directly through client Firestore SDK. No admin API route exists for deletion (unlike creation which uses `/api/admin/tags`). Inconsistent authorization pattern.
**Fix:** Create `/api/admin/tags/[tagId]` DELETE route with `verifyAdminToken()`.

#### H-03 | Post create/update bypasses server-side auth
**Files:** `src/services/firebase/firestore/post.ts:162-175`, `src/hooks/usePostForm.ts:165`
**Description:** Post CRUD performed via client Firestore SDK. No server-side content validation (malicious markdown, slug uniqueness). Combined with `rehypeRaw` in PostContent, stored content is rendered with raw HTML.
**Fix:** Route through server-side API with validation and sanitization.

### Performance HIGH (6)

#### H-04 | Client Firebase SDK used in sitemap.ts (server context)
**File:** `src/app/sitemap.ts:4-5`
**Description:** Imports client SDK (`firebase/firestore`) in server-side context. Pulls ~150-200KB client Firebase bundle into server runtime. Also uses redundant double-filter (`isPublished` AND `status`).
**Fix:** Use `getAdminDb()` from `firebase-admin` or `getAllPublishedPostsServer()`.

#### H-05 | react-markdown imported statically in client component
**File:** `src/components/post/PostContent.tsx:6`
**Description:** ReactMarkdown + remarkGfm + rehypeRaw + rehypeSanitize statically imported (~80-120KB gzipped). Every post page visitor downloads the full pipeline synchronously.
**Fix:** Dynamic import `PostContent` using `next/dynamic` with `ssr: false` from PostDetail.tsx.

#### H-06 | Server components use client Firebase SDK for data fetching
**Files:** `src/components/home/FeaturedTutorials.tsx:2`, `src/components/home/latestPosts/LatestPosts.tsx:5`, `src/components/posts/PostsList.tsx:3`, `src/components/tutorials/TutorialsList.tsx:3`, `src/components/tags/TagsList.tsx:3`
**Description:** Async server components import from client-side Firestore wrappers. Client Firebase SDK initialized on server for each render.
**Fix:** Create server-side equivalents using Admin SDK in `post-server.ts` / new `tags-server.ts`.

#### H-07 | Admin API route uses client SDK for posts
**File:** `src/app/api/admin/posts/route.ts:3`
**Description:** Admin posts API imports `getAllPosts` from client SDK. Should use Admin SDK like users/newsletter routes.
**Fix:** Replace with Admin SDK query.

#### H-08 | No pagination in admin data fetching
**Files:** `src/app/api/admin/users/route.ts:29`, `src/app/api/admin/newsletter/route.ts:29-32`, `src/app/api/admin/posts/route.ts:17`
**Description:** All admin API routes fetch ALL records then filter in memory. No `limit()` on users/newsletter. Posts limited to 200.
**Fix:** Cursor-based pagination with `startAfter`/`limit`. Push filters to Firestore `where` clauses.

#### H-09 | Homepage revalidation too aggressive (60s)
**File:** `src/app/page.tsx:22`
**Description:** `revalidate = 60` for a blog that publishes occasionally. Every minute triggers server re-render and Firestore queries.
**Fix:** Increase to 300-600s. Use on-demand revalidation when content is published.

### SEO HIGH (6)

#### H-10 | Feed descriptions don't match site content
**Files:** `src/app/feed.xml/route.ts:11`, `src/app/feed.json/route.ts:11`, `src/app/atom.xml/route.ts:11`
**Description:** Feeds say "desarrollo web, programacion y tecnologia moderna" but site is about Swift/SwiftUI. Conflicting signals for feed readers and search engines.
**Fix:** Change to "Publicaciones, guias y tutoriales para aprender Swift y SwiftUI de manera efectiva".

#### H-11 | Missing canonical URLs on legal pages
**Files:** `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/cookies/page.tsx`, `src/app/site-map/page.tsx`
**Description:** No `alternates.canonical` in metadata. Other pages correctly set canonical URLs.
**Fix:** Add `alternates: { canonical: \`${SITE_URL}/privacy\` }` etc.

#### H-12 | No dedicated OG image (using 512x512 logo)
**File:** `src/app/layout.tsx:21`
**Description:** Using `/icons/logo.png` (512x512 square). Facebook/Twitter/LinkedIn recommend 1200x630. Image appears cropped when shared.
**Fix:** Create `public/og-image.png` at 1200x630 with branding.

#### H-13 | Missing BreadcrumbList JSON-LD on post/tutorial pages
**Files:** `src/components/post/PostBreadcrumbs.tsx`, `src/app/posts/[slug]/page.tsx`, `src/app/tutorials/[slug]/page.tsx`
**Description:** PostBreadcrumbs renders visual breadcrumbs but no JSON-LD. Only TagBreadcrumbs has structured data. Missing rich snippets on highest-value pages.
**Fix:** Add `<script type="application/ld+json">` with BreadcrumbList schema.

#### H-14 | `publisher` field is a LinkedIn URL instead of org name
**File:** `src/utils/metadataUtils.ts:54`
**Description:** `publisher: "https://www.linkedin.com/in/alvaro-guerra/"` instead of `publisher: "aprendeSwift"`.
**Fix:** Change to `publisher: "aprendeSwift"`.

#### H-15 | Post detail pages allow duplicate H1s from markdown
**Files:** `src/components/post/PostContent.tsx:169-180`, `src/components/post/PostHeader.tsx:33`
**Description:** PostHeader renders `<h1>` for title. PostContent allows `<h1>` in markdown via ReactMarkdown components. Authors using `#` create multiple H1s.
**Fix:** Remap `h1` to `<h2>` in PostContent's ReactMarkdown components config.

### Firebase HIGH (4)

#### H-16 | Newsletter subscribe has no bot protection
**File:** `src/services/firebase/firestore/newsletter.ts:48`
**Description:** `subscribe()` writes directly to Firestore from client SDK. Rules allow unauthenticated creates. Client can bypass middleware entirely.
**Fix:** Route through API with CAPTCHA/App Check, or implement Firebase App Check.

#### H-17 | `createOrUpdateAuthorProfile` uses setDoc without merge
**File:** `src/services/firebase/firestore/authors.ts:43`
**Description:** `setDoc(doc(...), authorData)` without `{ merge: true }`. Completely overwrites author document, losing fields set by admin.
**Fix:** Add `{ merge: true }` to setDoc.

#### H-18 | `deletePostComments` batch can exceed 500-operation limit
**File:** `src/services/firebase/firestore/comments.ts:236-262`
**Description:** All comments added to a single `writeBatch`. Firestore batches have hard limit of 500 operations.
**Fix:** Split into chunks of 500.

#### H-19 | `getPostsByTag` fetches unpublished posts
**File:** `src/services/firebase/firestore/post.ts:72-94`
**Description:** Query uses `array-contains` on tags but doesn't filter by `isPublished`. Unpublished posts leaked to client, filtered in JS.
**Fix:** Add `where("isPublished", "==", true)` to query. Requires composite index.

### Accessibility HIGH (10)

#### H-20 | MobileNav drawer lacks focus trap
**File:** `src/components/layout/header/MobileNav.tsx:22-42`
**WCAG:** 2.4.3 Focus Order
**Fix:** Add Tab key handler to trap focus within drawer elements.

#### H-21 | PostsFiltersMobile drawer lacks focus trap
**File:** `src/components/posts/PostsFiltersMobile.tsx:129-226`
**WCAG:** 2.4.3 Focus Order
**Fix:** Same as H-20.

#### H-22 | MobileNav overlay not keyboard accessible
**File:** `src/components/layout/header/MobileNav.tsx:47-51`
**WCAG:** 2.1.1 Keyboard
**Fix:** Add `aria-hidden="true"` to overlay div.

#### H-23 | Modal overlay not keyboard accessible
**File:** `src/components/ui/Modal.tsx:106-111`
**WCAG:** 2.1.1 Keyboard
**Fix:** Add `aria-hidden="true"` to overlay div.

#### H-24 | LoginForm errors not associated with inputs
**File:** `src/components/auth/LoginForm.tsx:91-93,113-115`
**WCAG:** 4.1.3, 1.3.1
**Fix:** Pass errors through Input's `error` prop instead of separate `<p>` elements.

#### H-25 | RegisterForm errors not associated with inputs
**File:** `src/components/auth/RegisterForm.tsx:98,114,131,148`
**WCAG:** 4.1.3, 1.3.1
**Fix:** Same as H-24.

#### H-26 | RecoverForm errors not associated with inputs
**File:** `src/components/auth/RecoverForm.tsx:86-88`
**WCAG:** 4.1.3, 1.3.1
**Fix:** Same as H-24.

#### H-27 | Login/Recover general errors lack `role="alert"`
**Files:** `src/components/auth/LoginForm.tsx:128-132`, `src/components/auth/RecoverForm.tsx:91-94`
**WCAG:** 4.1.3
**Fix:** Add `role="alert"` to error divs.

#### H-28 | No `aria-live` regions in the entire application
**WCAG:** 4.1.3
**Description:** Zero `aria-live` attributes in the codebase. Search results, filter changes, success messages, loading states all update silently for screen readers.
**Fix:** Add `aria-live="polite"` to dynamic content areas.

#### H-29 | Code quality: duplicated email validation
**Files:** `src/utils/formUtils.ts:4-12`, `src/utils/validation.ts:1-7`
**Description:** Two different email validation implementations with different regex. Client hooks use formUtils, API routes use validation.ts.
**Fix:** Consolidate into single validation module.

### Code Quality HIGH (5)

#### H-30 | Non-null assertions in comment tree organization
**File:** `src/services/firebase/firestore/comments.ts:368`
**Description:** `parent.replies!.push(commentMap.get(comment.id)!)` can cause runtime exceptions if data is inconsistent.
**Fix:** Add null checks: `if (parent && child) { (parent.replies ??= []).push(child); }`

#### H-31 | Redundant catch-rethrow in togglePostLike
**File:** `src/services/firebase/firestore/post.ts:209-211`
**Description:** try/catch that simply rethrows unchanged. Dead code.
**Fix:** Remove the try/catch wrapper.

#### H-32 | Contact form validation allows overwrite of error messages
**File:** `src/hooks/useContactForm.ts:44-53`
**Description:** `validateEmail` sets "required" error, then `validateEmailFormat` overwrites it. Should short-circuit.
**Fix:** Use if/else if pattern for validation chain.

#### H-33 | `usePostViews` dependency causes re-execution
**File:** `src/hooks/usePostViews.ts:94`
**Description:** `user?.uid` in dependency array can trigger re-fire when user object reference changes on rehydration.
**Fix:** Extract uid to stable variable or use ref to track if effect has run.

---

## MEDIUM (63)

### Security MEDIUM (4)

| ID | Title | File | Fix |
|----|-------|------|-----|
| M-01 | rehype-sanitize allows iframes with component-only filtering | `PostContent.tsx:33-54` | Add domain restrictions at sanitizer level |
| M-02 | Newsletter welcome endpoint has no auth | `api/newsletter/welcome/route.ts:6` | Add `welcomeEmailSent` flag or use Cloud Function |
| M-03 | Contact form has no CAPTCHA | `api/contact/route.ts` | Add reCAPTCHA/hCaptcha |
| M-04 | Post views incrementable without limits | `firestore.rules:183-190` | Track views server-side with IP dedup |

### Performance MEDIUM (9)

| ID | Title | File | Fix |
|----|-------|------|-----|
| M-05 | useContentStats duplicates data fetching | `hooks/useContentStats.ts:32-38` | Pass data as props from server component |
| M-06 | usePosts fetches ALL posts client-side in admin | `app/admin/page.tsx:13` | Create `/api/admin/stats` endpoint |
| M-07 | Missing revalidate on listing pages | `app/posts/page.tsx`, `app/tutorials/page.tsx`, `app/tags/page.tsx` | Add `revalidate = 300` |
| M-08 | PostContent re-renders on keystroke in admin preview | `admin/posts/PostContentEditor.tsx:72` | Debounce content with `useDebounce` |
| M-09 | CommentItem not memoized in list | `components/post/CommentItem.tsx:25` | Wrap with `React.memo()` |
| M-10 | react-icons barrel import still used | `SocialShareButtons.tsx`, `SocialLoginButtons.tsx`, `auth/layout.tsx` | Replace with lucide-react equivalents, remove react-icons |
| M-11 | Missing `sizes` prop on Image components | `PostAuthorBio.tsx`, `CommentItem.tsx`, `UserItem.tsx`, `ProfileAvatar.tsx` | Add `sizes="40px"` etc. |
| M-12 | useUserArticles unstable dependency | `hooks/useUserArticles.ts:36,69` | Use `userStats?.likes?.join(',')` as dep |
| M-13 | Feed routes send full post content | `feed.xml/route.ts:45`, `atom.xml/route.ts:51`, `feed.json/route.ts:35` | Use Firestore `select()` projection |

### SEO MEDIUM (8)

| ID | Title | File | Fix |
|----|-------|------|-----|
| M-14 | Missing twitter card metadata on pages | `privacy/page.tsx`, `terms/page.tsx`, `cookies/page.tsx`, etc. | Add `twitter: { title, description }` |
| M-15 | TagBreadcrumbs JSON-LD uses `window.location.origin` | `tags/TagBreadcrumbs.tsx:16,22` | Use `SITE_URL` from constants |
| M-16 | Missing Organization JSON-LD schema | `app/layout.tsx` | Add standalone Organization schema |
| M-17 | site-map page not in XML sitemap | `app/sitemap.ts:18-67` | Add `/site-map` to staticPages |
| M-18 | Homepage title duplicates template default | `app/page.tsx:8` | Use more keyword-rich title with "iOS" |
| M-19 | Missing openGraph.url on homepage | `app/page.tsx:7-13` | Add `openGraph: { url: SITE_URL }` |
| M-20 | Admin layout cannot export metadata (client component) | `app/admin/layout.tsx` | Add `robots: { index: false }` via wrapper |
| M-21 | Profile page lacks `robots: noindex` | `app/profile/layout.tsx:1-10` | Add `robots: { index: false, follow: false }` |

### Firebase MEDIUM (7)

| ID | Title | File | Fix |
|----|-------|------|-----|
| M-22 | No offline/persistence support | `services/firebase/config.ts` | Configure `persistentLocalCache` |
| M-23 | `getAppConfig` uses client SDK with "use server" | `services/ai/config.ts:1,6-7` | Use Admin SDK |
| M-24 | createComment and incrementReplyCount not atomic | `firestore/comments.ts:91-96` | Use writeBatch or runTransaction |
| M-25 | deletePost not atomic (comments deleted before post) | `firestore/post.ts:178-182` | Delete post first or use transaction |
| M-26 | VALID_ROLES mismatch (API has 'guest', rules don't) | `api/admin/users/[uid]/role/route.ts:7`, `firestore.rules:65` | Align role lists |
| M-27 | Missing composite indexes for tags queries | `firebase/firestore.indexes.json` | Add tags+isPublished+publishedAt index |
| M-28 | Comment rate limiting in rules is unreliable | `firestore.rules:215-218` | Implement marker documents or remove non-functional rule |

### Accessibility MEDIUM (24)

| ID | Title | File | WCAG | Fix |
|----|-------|------|------|-----|
| M-29 | Auth page has no `<h1>` | `app/auth/page.tsx:13-24` | 1.3.1 | Add h1 based on active page |
| M-30 | Auth layout `<h2>` without `<h1>` | `app/auth/layout.tsx:30` | 1.3.1 | Change to decorative or ensure h1 first |
| M-31 | Footer `<h3>` without `<h2>` context | `layout/Footer.tsx:82,99` | 1.3.1 | Change to `<h2>` |
| M-32 | ProfileBio edit button lacks aria-label | `profile/header/ProfileBio.tsx:15-21` | 4.1.2 | Add `aria-label` |
| M-33 | Newsletter search input lacks label | `admin/newsletter/FilterControls.tsx:57-65` | 1.3.1 | Add `aria-label` |
| M-34 | Newsletter filter buttons lack aria-pressed | `admin/newsletter/FilterControls.tsx:24-53` | 4.1.2 | Add `aria-pressed` |
| M-35 | TagItem buttons lack contextual names | `admin/tags/TagItem.tsx:53-64` | 4.1.2 | Add `aria-label` with tag name |
| M-36 | SubscribersTable buttons lack context | `admin/newsletter/SubscribersTable.tsx:91-108` | 4.1.2 | Add `aria-label` with email |
| M-37 | TagList table has no thead/th | `admin/tags/TagList.tsx:35-43` | 1.3.1 | Add `<thead>` with `<th>` |
| M-38 | Input icon always renders as button | `ui/Input.tsx:44-56` | 4.1.2 | Render as `<span>` when no onIconClick |
| M-39 | Textarea icon always renders as button | `ui/Textarea.tsx:57-69` | 4.1.2 | Same as M-38 |
| M-40 | Password toggle has generic aria-label | `ui/Input.tsx:49` | 4.1.2 | Dynamic label for show/hide state |
| M-41 | LikeButton lacks visible focus indicator | `post/LikeButton.tsx:44-46` | 2.4.7 | Add `focus:ring-2` |
| M-42 | Multiple elements lack focus indicators | ProfileInfo, ProfileBio, TagItem, FilterControls, AuthFooter | 2.4.7 | Add focus ring styles |
| M-43 | Disabled NavItem uses `href="#"` without aria-disabled | `layout/header/NavItem.tsx:45-54` | 4.1.2 | Add `aria-disabled`, `tabIndex={-1}` |
| M-44 | Admin disabled nav items lack aria-disabled | `app/admin/layout.tsx:66-97` | 4.1.2 | Same as M-43 |
| M-45 | Contact form inputs lack `name` attribute | `contact/ContactForm.tsx:32-50` | 1.3.5 | Add `name` attributes |
| M-46 | Contact form fields lack `required` indicator | `contact/ContactForm.tsx:32-60` | 3.3.2 | Add `required` and visual indicators |
| M-47 | `text-white/40` fails contrast ratio | Input.tsx, NavItem.tsx, FilterControls.tsx | 1.4.3 | Increase to `text-white/60` min |
| M-48 | PostsFiltersMobile overlay not keyboard accessible | `posts/PostsFiltersMobile.tsx:132-137` | 2.1.1 | Add `aria-hidden="true"` |
| M-49 | SortOptions label lacks htmlFor | `posts/SortOptions.tsx:17-19` | 1.3.1 | Add `htmlFor` or use Select label prop |
| M-50 | ContentFilters labels lack htmlFor | `shared/ContentFilters.tsx:101-103,130-131` | 1.3.1 | Add `htmlFor` or restructure |
| M-51 | PostsFiltersMobile labels not associated | `posts/PostsFiltersMobile.tsx:166,187,197` | 1.3.1 | Add `htmlFor` |
| M-52 | Admin `<h1>` conflict (layout + pages both have h1) | `app/admin/layout.tsx:152` | 1.3.1 | Change layout heading to `<h2>` |

### Code Quality MEDIUM (11)

| ID | Title | File | Fix |
|----|-------|------|-----|
| M-53 | `shareToplatform` naming (should be `shareToPlatform`) | `hooks/useSocialShare.ts:73` | Rename to correct camelCase |
| M-54 | Dead/unused exported functions | `user.ts:273,100`, `tags.ts:72`, `newsletter.ts:146`, `post.ts:50` | Remove or deprecate |
| M-55 | ProtectedRoute duplicated permission logic | `auth/ProtectedRoute.tsx` | Consolidate into single approach |
| M-56 | Multiple redundant onAuthStateChanged listeners | `AuthInitializer.tsx`, `useAdminAPI.ts`, `useUserNewsletter.ts` | Derive from authStore instead |
| M-57 | useLikes useEffect for derived state | `hooks/useLikes.ts:29` | Replace with useMemo |
| M-58 | useTags filter computed in useEffect | `hooks/useTags.ts:72-84` | Replace with useMemo |
| M-59 | Mixed Spanish/English in code | Multiple files | Standardize: English code, Spanish UI |
| M-60 | usePostForm unsafe cast for nested fields | `hooks/usePostForm.ts:106` | Add type guard |
| M-61 | useContentStats depends on tags.length | `hooks/useContentStats.ts:72` | Use tags directly or compute separately |
| M-62 | usePost overloaded string/object parameter | `hooks/usePost.ts:22` | Split into two hooks |
| M-63 | usePostForm handleSubmit silent error | `hooks/usePostForm.ts:169-170` | Add toast.error() |

---

## LOW (32)

### Security LOW (2)

| ID | Title | File |
|----|-------|------|
| L-01 | JSON-LD `dangerouslySetInnerHTML` vulnerable to `</script>` breakout | `posts/[slug]/page.tsx:39`, `jsonLdUtils.ts` |
| L-02 | Comment auth check TOCTOU gap (mitigated by rules) | `firestore/comments.ts:167-196` |

### Performance LOW (5)

| ID | Title | File |
|----|-------|------|
| L-03 | Missing image optimization config (AVIF) | `next.config.ts` |
| L-04 | useTags refetches all after every CRUD | `hooks/useTags.ts:99,110,121` |
| L-05 | site-map page missing force-static | `app/site-map/page.tsx` |
| L-06 | getTotalComments recalculated every render | `hooks/useComments.ts:174` |
| L-07 | Admin pages could lazy-load heavy components | `admin/posts/new/page.tsx`, `admin/posts/edit/[slug]/page.tsx` |

### SEO LOW (7)

| ID | Title | File |
|----|-------|------|
| L-08 | PostCard `<h3>` should be `<h2>` on listing pages | `posts/PostCard.tsx:61` |
| L-09 | TutorialCard same heading issue | `tutorials/TutorialCard.tsx` |
| L-10 | Atom feed `<link>` missing `rel="alternate"` | `atom.xml/route.ts:42` |
| L-11 | Homepage OG image missing `type` property | `app/layout.tsx:21` |
| L-12 | site-map page references non-existent `/newsletter` | `app/site-map/page.tsx:33` |
| L-13 | PostCard/PostCardList hardcode `/posts/` path for tutorials | `posts/PostCard.tsx:23`, `posts/PostCardList.tsx` |
| L-14 | Missing web app manifest | No manifest.json or manifest.ts |

### Firebase LOW (5)

| ID | Title | File |
|----|-------|------|
| L-15 | getPostComments loads all without pagination | `firestore/comments.ts:108-144` |
| L-16 | incrementPostViews has no deduplication | `firestore/post.ts:215-218` |
| L-17 | createUserProfile setDoc without merge (race condition) | `firestore/user.ts:83` |
| L-18 | listImages silently returns empty on error | `storage/image.ts:148-152` |
| L-19 | No Firebase App Check configured | `services/firebase/config.ts` |

### Accessibility LOW (6)

| ID | Title | File |
|----|-------|------|
| L-20 | Newsletter email input `id="email"` potential duplicate | `home/NewsletterSignup.tsx:102` |
| L-21 | PostImageHandler file input lacks label | `admin/posts/PostImageHandler.tsx:119-125` |
| L-22 | TagForm uses alert() instead of toast | `admin/tags/TagForm.tsx:77` |
| L-23 | ViewToggle container lacks role="group" | `posts/ViewToggle.tsx:16-42` |
| L-24 | Skeleton components lack aria-busy | Multiple skeleton files |
| L-25 | Missing web app manifest (SEO/a11y crossover) | No manifest file |

### Code Quality LOW (7)

| ID | Title | File |
|----|-------|------|
| L-26 | useSocialShare analytics tracking duplicated 3x | `hooks/useSocialShare.ts:108-118` |
| L-27 | usePosts stats computation is 170 lines | `hooks/usePosts.ts:56-223` |
| L-28 | Inconsistent Response.json vs NextResponse.json | Multiple API routes |
| L-29 | useProfileEditor progress timer not cleaned on unmount | `hooks/useProfileEditor.ts:94-108` |
| L-30 | SocialShareButtons dropdown no keyboard close | `post/SocialShareButtons.tsx:230-294` |
| L-31 | PostFilters interface duplicated client/server | `firestore/post.ts`, `firestore/post-server.ts` |
| L-32 | serializeValue logic duplicated client/server | `firebase/utils/utils.ts`, `firestore/post-server.ts` |

---

## Recommended Implementation Order

### Phase 1 - Critical Security & Data Integrity ✅ DONE (commit cda2d48)
**Items:** C-01, C-02, C-03, C-04, C-05
**Impact:** Prevents abuse, reduces Firestore costs, ensures data persistence

### Phase 2 - High-Priority Quick Wins ✅ DONE (commit 63f6ec0)
**Items:** H-10, H-14, H-15, H-17, H-29, H-30, H-31, H-32, H-33
**Impact:** SEO accuracy, data integrity, code correctness

### Phase 3 - Performance (Server SDK Migration) ✅ DONE (commit c39fe2d)
**Items:** H-04, H-05, H-06, H-07, H-09
**Impact:** Significantly reduces bundle size, Firestore reads, and cold starts

### Phase 4 - Accessibility Foundations ✅ DONE (commit 23cef72)
**Items:** H-20, H-21, H-22, H-23, H-24, H-25, H-26, H-27, H-28, M-48
**Impact:** WCAG 2.1 AA compliance for core user flows

### Phase 5 - Medium Priority Improvements 🔄 IN PROGRESS (commit a5273c7)
**Done:** M-07, M-14, M-15, M-16, M-18, M-19, M-21, M-29, M-31, M-32, M-33, M-34, M-35, M-36, M-37, M-38, M-39, M-40, M-41, M-43, M-44, M-45, M-46, M-49, M-50, M-51, M-52, M-53, M-58
**Remaining:** M-01, M-02, M-03, M-04, M-05, M-06, M-08, M-09, M-10, M-11, M-12, M-13, M-20, M-22, M-23, M-24, M-25, M-26, M-27, M-28, M-30, M-47, M-54, M-55, M-56, M-57, M-59, M-60, M-61, M-62, M-63
**Effort:** High (many items, mostly incremental)

### Phase 6 - Low Priority / Future Backlog
**Items:** All LOW items
**Effort:** Variable

---

## What's Already Well-Implemented

- Skip-to-content link in root layout
- Firebase Admin SDK architecture for API routes (users, newsletter)
- Modal component with full a11y (focus trap, Escape, aria-modal)
- Select component with ARIA combobox pattern
- Input/Textarea with built-in aria-invalid, aria-describedby
- Pagination with aria-current and disabled handling
- Security headers in middleware (CSP, HSTS, X-Frame-Options)
- XSS protection via rehype-sanitize
- Proper .gitignore for secrets
- ISR on post detail pages (revalidate = 300)
- Image optimization with next/image
- Lucide-react migration (85 usages)
