const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中間件
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 配置 multer 用於文件上傳
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB 限制
    }
});

// Gemini API 設定
const GEMINI_API_KEY = 'AIzaSyBp-3bhNGqHW_XR6oAGK4TbbutGkTGUQNQ';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent';

// 分析食物圖片的 API
app.post('/api/analyze-image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: '画像をアップロードしてください' });
        }

        // 將圖片轉換為 base64
        const base64Image = req.file.buffer.toString('base64');
        
        const requestBody = {
            contents: [{
                parts: [
                    {
                        text: "この食品画像を分析し、以下の情報を提供してください：1. 食品名（日本語）2. 推定カロリー 3. 主な栄養成分 4. 健康アドバイス。日本語で回答し、分かりやすく読みやすい形式でお願いします。"
                    },
                    {
                        inline_data: {
                            mime_type: req.file.mimetype,
                            data: base64Image
                        }
                    }
                ]
            }]
        };

        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const analysis = response.data.candidates[0].content.parts[0].text;
        res.json({ analysis });

    } catch (error) {
        console.error('画像分析時にエラー発生:', error);
        res.status(500).json({ error: '画像分析中にエラーが発生しました' });
    }
});

// 分析文字描述的 API
app.post('/api/analyze-text', async (req, res) => {
    try {
        const { foodDescription } = req.body;
        
        if (!foodDescription) {
            return res.status(400).json({ error: '食品の説明を入力してください' });
        }

        const requestBody = {
            contents: [{
                parts: [{
                    text: `以下の食品説明を分析し、詳細な栄養情報を提供してください：${foodDescription}。提供内容：1. 食品名 2. 推定カロリー 3. 主な栄養成分（タンパク質、炭水化物、脂質、食物繊維など）4. 健康アドバイス。日本語で回答し、分かりやすく読みやすい形式でお願いします。`
                }]
            }]
        };

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const analysis = response.data.candidates[0].content.parts[0].text;
        res.json({ analysis });

    } catch (error) {
        console.error('テキスト分析時にエラー発生:', error);
        res.status(500).json({ error: 'テキスト分析中にエラーが発生しました' });
    }
});

// 服務靜態文件
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`サーバーは http://localhost:${PORT} で稼働中`);
}); 