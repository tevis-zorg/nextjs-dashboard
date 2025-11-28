Further Readings

***Chapter 3***

__Image & font optimization__

+ https://nextjs.org/docs/app/building-your-application/optimizing/images
+ https://nextjs.org/docs/app/building-your-application/optimizing/fonts
+ https://developer.mozilla.org/en-US/docs/Learn/Performance/Multimedia
+ https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts
+ https://vercel.com/blog/how-core-web-vitals-affect-seo
+ https://vercel.com/blog/how-google-handles-javascript-throughout-the-indexing-process

***End of chapter 3***

***Chapter 4***

- Q: isn't that makes the user's gadget memories do the heavy lifting? remembering they have to store all the prefetched data inside before it is neede? what happens if the user don't hit the predicted already downloaded prefetched datas?

- A: Excellent question! You've identified a real concern. Let me explain how Next.js and modern browsers handle this intelligently:
Memory/Cache Management:
1. Smart Cache Limits
javascript

// Browsers have automatic cache eviction policies
// When cache reaches limit, oldest/unused items get removed first

Cache Storage Limit: ~50-200MB (varies by browser)
Memory Usage: Temporary, cleared on navigation

2. What Actually Gets Pre-fetched
jsx

// Next.js pre-fetches SMALL bundles, not entire pages
<Link href="/about">About</Link>

// Pre-fetches: 
// - JavaScript bundle (compressed, typically 10-50KB)
// - NOT images, videos, or large assets
// - NOT API data (fetched separately when needed)

What Happens to Unused Pre-fetches:
3. Automatic Cleanup
javascript

// Unused pre-fetches get automatically removed:
Browser Cache → Evicted after time/size limits
Memory Cache → Cleared on page navigation
Service Worker → Can be manually managed

4. Cost-Benefit Analysis
javascript

// The tradeoff is calculated:
Potential Benefit: Instant page load (user happy)
Potential Cost: ~20KB wasted bandwidth (negligible)

// Example: Pre-fetch 10 links = ~200KB total
// Compared to: One HD image = ~500KB-2MB

Real-World Scenario:
jsx

// User visits e-commerce site
<Link href="/products">Products</Link>        // Pre-fetched ✅
<Link href="/about">About</Link>              // Pre-fetched ✅  
<Link href="/contact">Contact</Link>          // Pre-fetched ✅

// User only clicks "Products" - what happens?
✅ "/products" bundle: Used (served from cache)
❌ "/about" bundle: Automatically cleared after time
❌ "/contact" bundle: Automatically cleared after time

// Total "waste": ~40KB (less than one small image)

Advanced Optimizations:
5. Predictive Pre-fetching
javascript

// Next.js only pre-fetches when confident:
- Links in viewport (high probability of click)
- On hover (user showing intent)
- Not on slow connections (respects data limits)

6. Connection-Aware
javascript

// No pre-fetching on:
if (navigator.connection.saveData === true) {
  // Data saver mode - skip pre-fetching
}

if (navigator.connection.effectiveType === 'slow-2g') {
  // Slow connection - skip pre-fetching
}

The Reality:
Worst Case Scenario:
javascript

User pre-fetches 20 links but clicks none
Total "waste": 20 × 20KB = 400KB
Equivalent: One medium-quality JPEG image
Cleared: Automatically within hours/minutes

Best Case Scenario:
javascript

User pre-fetches 5 links, clicks 3
"Waste": 2 × 20KB = 40KB
Benefit: 3 instant page loads (better UX)

So To Answer Your Concerns:

✅ Memory Impact: Minimal (small bundles only)
✅ Cache Bloat: Automatic cleanup prevents this
✅ Data Waste: Much less than images/videos
✅ Performance: Net positive when pre-fetch hits

Bottom Line: The tiny cost of unused pre-fetches is worth the massive UX improvement when they're used! Modern browsers are very efficient at cache management.

***End of Chapter 4***

***Chapter 5***

- Q: to handle the slow transition, loading.tsx are necessary. my question is, does the LoadingSkeleton means here is the skeleton of HTML page such as static UI display which doesn't contains any image or video? just some light font, card display(without image, GIF, or video), and another website components?

- A: Exactly right! You've perfectly described what a Loading Skeleton is.
Loading Skeleton = UI Structure Only
jsx

// components/ProductSkeleton.jsx
export function ProductSkeleton() {
  return (
    <div className="skeleton-card">
      {/* Image placeholder - NO actual image */}
      <div className="skeleton-image"></div>
      
      {/* Text placeholders - NO real content */}
      <div className="skeleton-title"></div>
      <div className="skeleton-description"></div>
      
      {/* Button placeholder */}
      <div className="skeleton-button"></div>
    </div>
  );
}

What Loading Skeletons Contain:
✅ DO Include:

    Layout structure (cards, grids, containers)

    Shape placeholders (rectangles, circles for images)

    Text lines (varying widths to mimic text)

    Basic CSS animations (pulse, shimmer effects)

    Lightweight HTML elements (divs, spans)

❌ DO NOT Include:

    Images, GIFs, or videos

    Heavy fonts or web fonts

    JavaScript logic or API calls

    Real data/content

    Complex animations

    External dependencies

Real Example:
jsx

// Instead of loading with spinners, show content structure
function UserProfileSkeleton() {
  return (
    <div className="profile-skeleton">
      {/* Avatar placeholder */}
      <div className="skeleton-avatar"></div>
      
      {/* Name placeholder */}
      <div className="skeleton-name"></div>
      
      {/* Bio placeholder */}
      <div className="skeleton-bio-line"></div>
      <div className="skeleton-bio-line short"></div>
      
      {/* Stats placeholder */}
      <div className="skeleton-stats">
        <div className="skeleton-stat"></div>
        <div className="skeleton-stat"></div>
        <div className="skeleton-stat"></div>
      </div>
    </div>
  );
}

CSS for Lightweight Skeletons:
css

.skeleton-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-image {
  width: 100%;
  height: 200px;
  background: #f0f0f0;
  border-radius: 4px;
}

.skeleton-title {
  height: 20px;
  background: #f0f0f0;
  border-radius: 4px;
  margin: 8px 0;
}

.skeleton-description {
  height: 16px;
  background: #f0f0f0;
  border-radius: 4px;
  margin: 4px 0;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

Next.js loading.tsx Example:
jsx

// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="dashboard-skeleton">
      {/* Header */}
      <div className="skeleton-header"></div>
      
      {/* Sidebar */}
      <div className="skeleton-sidebar">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton-nav-item"></div>
        ))}
      </div>
      
      {/* Main content */}
      <div className="skeleton-main">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton-card"></div>
        ))}
      </div>
    </div>
  );
}

Why This Approach Works:

    Perceived Performance: User sees something happening immediately

    Layout Stability: No content shift when real data loads

    Lightweight: Typically 2-5KB vs 100KB+ for real content

    Better UX: More engaging than spinning loader


Next.js automatically prefetches the code for the linked route in the background. By the time the user clicks the link, the code for the destination page will already be loaded in the background, and this is what makes the page transition near-instant!

***End of Chapter 5***