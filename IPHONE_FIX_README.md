# iPhone Upload/Camera Compatibility Notes

This document explains how to use the food calorie analyzer web app on iPhone, and how to resolve common issues with image upload and camera access.

## Common Issues on iPhone

1. **Cannot open camera directly:**
   - Some iOS browsers (especially older versions or third-party browsers) may not support direct camera access from the web page.
2. **Cannot select photos from album:**
   - In some cases, the file picker may not show the photo album or may not allow selecting certain image formats (e.g., HEIC).
3. **Image upload fails or is not recognized:**
   - iOS may use HEIC/HEIF format by default, which is not supported by all web APIs or AI services.

## Solutions & Tips

- **Use Safari:**
  - For best compatibility, use the built-in Safari browser on iPhone.
- **Allow Camera and Photo Access:**
  - Make sure you have granted camera and photo access permissions to Safari (Settings > Safari > Camera/Photos).
- **Supported Formats:**
  - The app supports JPEG, PNG, WebP, HEIC, and HEIF. If upload fails, try converting the image to JPEG/PNG.
- **Take Photo vs. Select Image:**
  - "Take Photo" uses the camera directly. "Select Image" lets you pick from the album. If one fails, try the other.
- **Image Compression:**
  - Large images will be automatically compressed before upload. If the image is still too large, try cropping or resizing it in the Photos app first.
- **HEIC/HEIF Issues:**
  - If the AI service cannot analyze HEIC/HEIF images, convert them to JPEG/PNG using the iPhone Photos app (Share > Save as JPEG/PNG or use a third-party app).

## Troubleshooting

- **Page does not respond after selecting/taking a photo:**
  - Refresh the page and try again.
  - Try using a different browser (Safari recommended).
- **Image preview does not appear:**
  - Make sure the image format is supported.
  - Try converting the image to JPEG/PNG.
- **Analysis fails or returns an error:**
  - Check your network connection.
  - Make sure your API Key is valid and has enough quota.
  - Try again with a different image or description.

## Contact
If you encounter persistent issues on iPhone, please describe your problem and device/browser version, and contact the developer for support. 