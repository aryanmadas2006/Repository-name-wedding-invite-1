const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
    const inputPath = 'images/wedding gpt.png';
    const outputPath = 'images/story.jpg';
    
    try {
        const metadata = await sharp(inputPath).metadata();
        let width = metadata.width;
        
        // Scale down if > 2000px
        if (width > 2000) {
            width = 2000;
        }
        
        await sharp(inputPath)
            .resize(width)
            .jpeg({ quality: 82 })
            .toFile(outputPath);
            
        const newStats = fs.statSync(outputPath);
        const newMetadata = await sharp(outputPath).metadata();
        console.log(`Optimized image saved as \${outputPath}`);
        console.log(`Original width: \${metadata.width}px -> New width: \${newMetadata.width}px`);
        console.log(`File size: \${(newStats.size / 1024).toFixed(2)} KB`);
    } catch (e) {
        console.error("Error processing image:", e);
    }
}

processImage();

