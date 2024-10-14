// استدعاء المكتبات المطلوبة
const express = require('express');
const translate = require('@vitalets/google-translate-api');

const app = express();
const PORT = process.env.PORT || 3000;

// لقراءة بيانات JSON من طلبات POST
app.use(express.json());

// إنشاء مسار API لترجمة النصوص
app.post('/translate', async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;

    // التحقق من وجود النص واللغة المستهدفة
    if (!text || !targetLanguage) {
      return res.status(400).json({ error: 'يرجى توفير النص واللغة المستهدفة' });
    }

    // ترجمة النص باستخدام Google Translate API
    const result = await translate(text, { to: targetLanguage });

    // إرسال النص المترجم في الاستجابة
    res.json({ translatedText: result.text });
  } catch (error) {
    console.error('خطأ في الترجمة:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء الترجمة' });
  }
});

// تقديم الملفات الثابتة من مجلد 'public'
app.use(express.static('public'));

// تقديم ملف HTML الرئيسي
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// تشغيل الخادم على المنفذ المحدد
app.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT}`);
});
