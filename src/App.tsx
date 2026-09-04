import { Suspense, lazy, useEffect } from 'react'
import { WorldProvider, useWorld } from '@/state/WorldContext'
import { useControls } from '@/hooks/useControls'
import { articleSlug, navigate, routes, usePathname } from '@/lib/router'
import { Landing } from '@/components/site/Landing'
import { BlogArticle, BlogIndex } from '@/components/site/Blog'
import { Boot } from '@/components/ui/Boot'
import { Hud } from '@/components/ui/Hud'
import { Joystick } from '@/components/ui/Joystick'
import { Cursor } from '@/components/ui/Cursor'
import { ZonePanel } from '@/components/ui/Panels'
import { ProjectPanel } from '@/components/ui/ProjectPanel'
import { getArticle } from '@/data/lab'
import { site } from '@/data/site'
import { LanguageProvider } from '@/state/LanguageContext'
import '@/styles/ui.css'

/**
 * The station is the only thing that pulls three.js, so it stays behind a
 * dynamic import. On a phone — where the landing page is the default — the
 * renderer is never fetched at all unless somebody asks for the demo.
 */
const World = lazy(() => import('@/components/world/World'))

/**
 * Four routes.
 *
 *   /            the portfolio — 3D on desktop, the page on touch
 *   /world       the 3D demo, explicitly, on any device
 *   /blog        the write-ups
 *   /blog/:slug  one write-up
 *
 * The split at `/` is not a fallback. A phone reaches this content faster by
 * reading it than by walking a station on a five-inch screen, so on touch the
 * page is the site and the world is an optional demo behind its own URL.
 */
function Routes() {
  const pathname = usePathname()
  const { hasWebGL, isTouch } = useWorld()

  const slug = articleSlug(pathname)
  const worldAvailable = hasWebGL

  useDocumentTitle(pathname, slug)

  if (slug) return <BlogArticle slug={slug} />
  if (pathname === routes.blog) return <BlogIndex />

  const wantsWorld = pathname === routes.world
  /* Desktop keeps the world as the front door; touch has to ask for it. */
  const showWorld = worldAvailable && (wantsWorld || !isTouch)

  if (!showWorld) {
    /* Someone who asked for /world without a context should not get a blank
       page — send them to the one that works and leave no dead entry in the
       history for Back to land on. */
    if (wantsWorld && !worldAvailable) navigate(routes.home, { replace: true })
    return <Landing canEnterWorld={worldAvailable} />
  }

  return <WorldExperience />
}

function WorldExperience() {
  useControls()

  return (
    <>
      <Suspense fallback={null}>
        <World />
      </Suspense>

      <Boot />
      <Hud />
      <Joystick />
      <ZonePanel />
      <ProjectPanel />
      <Cursor />
    </>
  )
}

/**
 * The title is the only per-route metadata that can be set client-side and
 * still matter — it is what a tab, a bookmark and a shared link show.
 */
function useDocumentTitle(pathname: string, slug: string | null) {
  useEffect(() => {
    const article = slug ? getArticle(slug) : undefined

    document.title = article
      ? `${article.meta.title} — ${site.person}`
      : pathname === routes.blog
        ? `Lab — ${site.title}`
        : pathname === routes.world
          ? `Ibroximjon Space — ${site.person}`
          : site.title
  }, [pathname, slug])
}

export default function App() {
  return (
    <LanguageProvider>
      <WorldProvider>
        <Routes />
      </WorldProvider>
    </LanguageProvider>
  )
}
