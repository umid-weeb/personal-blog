# Project screenshots

These are the screenshots currently used by the project catalog.

| File                   | Project      | Live site       |
| ---------------------- | ------------ | --------------- |
| `turon.png`            | Turon Kafesi | —               |
| `pyzone.png`            | Pyzone.uz    | pyzone.uz       |
| `pyzone-zone.png`       | Pyzone Zone  | pyzone.uz/zone  |

## What the file should be

- **Format:** PNG. Keep the filename and extension — the paths are referenced
  from `src/data/projects.ts`.
- **Aspect ratio:** 16:10. The placeholders are 1760 × 1100. The exhibit
  hologram in the world uses a 16:10 plane, so a very different ratio will
  letterbox there.
- **Size:** under ~150 KB each. All seven are loaded when the station builds,
  because each one is mapped onto its hologram in the projects bay.

Producing one from a screenshot:

```bash
cp screenshot.png public/projects/turon.png
```

## Adding an eighth project

Add an entry to `projects` in `src/data/projects.ts` and drop its image here.
The exhibit in the bay, the arc it stands on, the panel, the bay directory and
the written fallback all read from that one array.
