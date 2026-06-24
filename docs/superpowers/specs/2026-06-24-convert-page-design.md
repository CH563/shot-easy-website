# Convert Page Design

## Goal

Add a new ShotEasy tool page, `Convert`, at `/convert`, for browser-local image and PDF format conversion. The page must match the existing functional page style used by Image Compressor and Long Image: centered title, compact toolbar, dotted workspace, black summary bar after files are added, per-file rows, download buttons, local-processing messaging, and explanatory SEO sections below the tool.

The first version should be fully usable for the requested conversion families:

- PNG to WebP
- JPG to WebP
- Common image conversion between JPG, PNG, WebP, and SVG where browser canvas supports it
- Multiple images to PDF
- PDF to multiple images
- SVG to PNG
- PNG to ICO

All work happens locally in the browser. Files are not uploaded to a server.

## Route And Navigation

- Add `/convert` and localized `/[locale]/convert` routes.
- Add `Convert` to the main navigation after Image Compressor and before Long Image, unless the final nav width needs it after Long Image for mobile fit.
- Add localized navigation labels in every existing locale:
  - English: `Convert`, `Image Convert`
  - Chinese: `转换`, `图片格式转换`
  - Other locales may use clear translated or English fallback labels if needed.
- Add homepage and footer links in the existing tool-link style.

## Page Layout

The page follows the same structure as existing tools:

1. H1 with the same gray gradient typography.
2. Short subtitle emphasizing local browser conversion and no upload.
3. Main React conversion tool inside a `pb-12 min-h-[300px]` container.
4. SEO/content sections using the same rounded pastel section pattern.
5. `LocalProcessingBlock`.
6. `Privacy`.
7. WebApplication JSON-LD.

The main tool surface follows the selected Option A: operation-first.

Toolbar:

- `Add Files`
- `Add Folder` when directory picker is available
- `Convert All`
- `Download All` when converted outputs exist
- `Clear All`

Settings row:

- `Convert:` select for conversion mode
- Mode-specific controls:
  - Image to image: output format, optional quality for JPEG/WebP.
  - Images to PDF: page size behavior, background color default white.
  - PDF to images: output format PNG/JPG and render scale default 2.
  - PNG to ICO: ICO size options such as 16, 32, 48, 64, 128, 256, default 256.

Workspace:

- Empty state: centered drag/drop upload box, matching Image Compressor.
- With files: white list card over dotted background.
- Black summary bar shows count, input size, converted output size when available, and active conversion mode.
- File rows show thumbnail or file-type icon, file name, input format, dimensions/page count where known, input size, status, output size, and download action.

## Conversion Modes

Use one mode selector rather than separate mini-tools.

Initial mode set:

- `image-to-webp`: PNG/JPG/JPEG to WebP.
- `image-to-jpg`: PNG/WebP/SVG to JPG.
- `image-to-png`: JPG/WebP/SVG to PNG.
- `images-to-pdf`: selected images become a multi-page PDF.
- `pdf-to-images`: each PDF page becomes one image.
- `svg-to-png`: SVG renders to PNG.
- `png-to-ico`: one or more PNG files become ICO files.

If a file is incompatible with the active mode, keep it in the list but mark it as skipped with a short reason rather than failing the whole batch.

## Local Processing And Libraries

Use existing dependencies where possible.

- PDF to images: reuse the existing `pdfjs-dist` approach from `LongImageComposer`.
- Images to PDF: reuse or extract the existing simple PDF Blob generator from `LongImageComposer`, extending it to support multiple pages.
- ZIP download: use existing `jszip`.
- Image rendering/conversion: use browser `Image`, `Canvas`, `Blob`, `File`, and `URL.createObjectURL`.
- SVG to PNG: load SVG as an image and draw to canvas, preserving natural dimensions when available.
- PNG to ICO: generate ICO bytes in-browser from PNG/canvas output. Start with uncompressed PNG-in-ICO entries for broad modern compatibility.

Do not add new dependencies unless existing dependencies cannot produce a correct output.

## Data Flow

Each input file becomes an item:

- `id`
- `file`
- `name`
- `type`
- `size`
- `src` for preview when available
- `width` and `height` for image inputs
- `pageCount` for PDF inputs
- `status`: `ready`, `converting`, `done`, `skipped`, `error`
- `error` or `skipReason`
- `outputs`: one or more converted result objects

Each output result:

- `name`
- `blob`
- `url`
- `type`
- `size`
- `width`, `height`, or `pageNumber` when useful

When the user changes conversion mode or settings, existing outputs are invalidated but input files remain.

## Error Handling

- Unsupported files show a warning and are not added.
- Incompatible files in a selected mode are marked as skipped.
- Per-file conversion errors should not stop the whole batch.
- PDF rendering errors show a clear row-level error.
- If there are no successful outputs, `Download All` remains disabled.
- Object URLs should be revoked when clearing files or replacing outputs.

## SEO And Content

Add localized TDK for all locales. The English target terms:

- image converter online
- png to webp
- jpg to webp
- images to pdf
- pdf to images
- svg to png
- png to ico
- local image converter

Chinese target terms:

- 图片格式转换
- PNG转WebP
- JPG转WebP
- 多图片转PDF
- PDF转图片
- SVG转PNG
- PNG转ICO
- 在线图片转换
- 本地图片转换

Below the tool, add concise sections:

- Local image format converter
- PDF and image conversion in your browser
- Supported conversions

## Testing

Verification should include:

- `npm run astro -- check`
- Missing `<img>` alt scan remains clean.
- Manual/browser checks for:
  - Empty state visual alignment.
  - Add files and list summary.
  - PNG/JPG to WebP.
  - SVG to PNG.
  - Images to PDF.
  - PDF to images with a simple PDF.
  - PNG to ICO.
  - Download single output and download all.
  - Mobile layout does not overflow.

Known existing caveat: full `npm run build` may still fail on the existing Vercel adapter runtime validation issue unrelated to this feature. Record that separately if it persists.

## Out Of Scope For First Version

- Server-side conversion.
- HEIC/RAW conversion.
- OCR.
- Password-protected PDF handling.
- Advanced PDF layout options beyond one image per page.
- Multi-page TIFF.

