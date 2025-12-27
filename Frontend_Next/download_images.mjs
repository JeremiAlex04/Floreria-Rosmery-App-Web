import fs from 'fs';
import https from 'https';
import path from 'path';

const products = [
    { id: 1, prompt: "huge luxurious bouquet of red roses romantic style high quality" },
    { id: 2, prompt: "box of chocolates and pink flowers gift set high quality" },
    { id: 3, prompt: "bouquet of red roses in a vase elegant high quality" },
    { id: 4, prompt: "pink flower box arrangement surprise gift luxury" },
    { id: 5, prompt: "luxury flower box mix colors elegant gift" },
    { id: 6, prompt: "heart shaped red roses box arrangement romantic" },
    { id: 7, prompt: "white bridal bouquet roses and lilies wedding" },
    { id: 8, prompt: "wedding table centerpiece flowers white and green elegant" },
    { id: 9, prompt: "large altar floral arrangement white flowers wedding church" },
    { id: 10, prompt: "elegant floral centerpiece dining table candles" },
    { id: 11, prompt: "tropical flowers centerpiece bright colors party" },
    { id: 12, prompt: "christmas floral centerpiece red and pine" },
    { id: 13, prompt: "funeral flower wreath white roses lilies" },
    { id: 14, prompt: "funeral standing spray white flowers condolences" },
    { id: 15, prompt: "cross shaped funeral flower arrangement red roses" },
    { id: 16, prompt: "colorful birthday bouquet gerberas roses bright" },
    { id: 17, prompt: "sunflower bouquet bright yellow happy birthday" },
    { id: 18, prompt: "flowers and balloon gift set birthday" },
    { id: 19, prompt: "blue and white flower arrangement for men elegant" },
    { id: 20, prompt: "small flower detail for father masculine style" },
    { id: 21, prompt: "gift box for father wine and flowers" },
    { id: 22, prompt: "huge bouquet pink roses and lilies mother's day" },
    { id: 23, prompt: "red roses bouquet 'mom I love you' tag" },
    { id: 24, prompt: "colorful tulips bouquet fresh spring flowers" },
    { id: 25, prompt: "single sunflower with greenery simple elegant" },
    { id: 26, prompt: "large bouquet of sunflowers and yellow roses" },
    { id: 27, prompt: "mixed bouquet sunflowers and red roses rustic style" },
    { id: 28, prompt: "graduation bouquet yellow and blue flowers" },
    { id: 29, prompt: "elegant bouquet with graduation cap decoration" },
    { id: 30, prompt: "gift box graduation teddy bear and flowers" },
    { id: 31, prompt: "white orchid in ceramic pot elegant minimalistic" },
    { id: 32, prompt: "pink double stem orchid plant luxury pot" },
    { id: 33, prompt: "small purple orchid arrangement cute" },
    { id: 34, prompt: "wildflower bouquet hand tied rustic style" },
    { id: 35, prompt: "mixed seasonal flowers hand bouquet colorful" },
    { id: 36, prompt: "pastel colored flower bouquet soft pinks and purples" },
    { id: 37, prompt: "giant luxury bouquet 100 roses huge magnificent" },
    { id: 38, prompt: "elegant mixed flower bouquet premium styling" },
    { id: 39, prompt: "tall vase arrangement hotel lobby style luxury" },
    { id: 40, prompt: "24 red roses bouquet classic romantic" },
    { id: 41, prompt: "white roses bouquet pure elegant" },
    { id: 42, prompt: "red roses bouquet with ferrero rocher chocolates" },
    { id: 43, prompt: "valentine's day gift set flowers teddy bear chocolates red" },
    { id: 44, prompt: "giant teddy bear holding red roses heart" },
    { id: 45, prompt: "heart shaped box red roses chocolates valentine" },
    { id: 46, prompt: "bouquet of 10 red tulips fresh" },
    { id: 47, prompt: "multicolored tulips bouquet cheerful" },
    { id: 48, prompt: "yellow tulips bouquet bright" },
];

const outputDir = path.join(process.cwd(), 'public', 'img', 'productos_nuevos');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else {
                reject(`Failed to download ${url}: ${response.statusCode}`);
            }
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err.message);
        });
    });
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    console.log("Starting downloads with delay...");
    for (const p of products) {
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(p.prompt)}?nologo=true`;
        const filename = `${p.id}.jpg`;
        const filepath = path.join(outputDir, filename);

        // Skip if exists and has size > 0
        if (fs.existsSync(filepath)) {
            const stats = fs.statSync(filepath);
            if (stats.size > 0) {
                console.log(`Skipping ${filename} (already exists)`);
                continue;
            }
        }

        let retries = 3;
        while (retries > 0) {
            try {
                console.log(`Downloading ${filename}...`);
                await downloadImage(url, filepath);
                console.log(`Downloaded ${filename}`);
                break; // Success
            } catch (error) {
                console.error(`Error downloading ${filename}: ${error}`);
                retries--;
                if (retries > 0) {
                    console.log(`Retrying... (${retries} left)`);
                    await delay(2000);
                }
            }
        }
        await delay(1000); // Wait 1s between successful downloads
    }
    console.log("Done!");
}

run();
