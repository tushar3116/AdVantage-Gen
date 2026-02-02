import sharp from "sharp";
import axios from "axios";

export const addBranding = async (imageBuffer, logoUrl, ctaText = "Shop Now") => {
  try {
    
    let logoBuffer = null;
    if (logoUrl) {
      const logoResponse = await axios.get(logoUrl, { responseType: 'arraybuffer' });
      logoBuffer = logoResponse.data;
    }


    const image = sharp(imageBuffer);
    const metadata = await image.metadata();

    
    const ctaWidth = 200;
    const ctaHeight = 60;
    const ctaSvg = `
    <svg width="${ctaWidth}" height="${ctaHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#007bff" rx="30"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle" dy=".3em">${ctaText}</text>
    </svg>
    `;

    const ctaBuffer = Buffer.from(ctaSvg);

    
    let compositeOperations = [];

    compositeOperations.push({
      input: ctaBuffer,
      top: metadata.height - ctaHeight - 20,
      left: Math.floor((metadata.width - ctaWidth) / 2),
    });

    
    if (logoBuffer) {
      const logoImage = sharp(logoBuffer);
      const logoMetadata = await logoImage.metadata();
      const logoSize = Math.min(100, Math.floor(metadata.width * 0.15)); 

      const resizedLogo = await logoImage
        .resize(logoSize, logoSize, { fit: 'inside' })
        .png()
        .toBuffer();

      compositeOperations.push({
        input: resizedLogo,
        top: metadata.height - logoSize - 20,
        left: metadata.width - logoSize - 20,
        blend: 'over',
      });
    }

    const brandedImage = await image
      .composite(compositeOperations)
      .png()
      .toBuffer();

    return brandedImage;
  } catch (error) {
    console.error('Error adding branding:', error);
    return imageBuffer; 
  }
};
