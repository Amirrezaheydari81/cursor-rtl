# Cursor RTL

<div dir="rtl">

راست‌چین کردن چت هوش مصنوعی Cursor (پاسخ‌ها، ورودی، لیست‌ها، جدول‌ها، To-do و Plan mode) با فونت فارسی قابل انتخاب. بلاک‌های کد چپ‌چین باقی می‌مانند.

## نصب

```
npm run package
cursor --install-extension cursor-rtl-1.0.0.vsix
```

یا از Command Palette: `Extensions: Install from VSIX...`

بعد از نصب، پیغام «Reload Window» ظاهر می‌شود؛ آن را بزنید.

## تنظیمات

| تنظیم | توضیح |
| --- | --- |
| `cursorRtl.enabled` | روشن/خاموش کردن راست‌چین |
| `cursorRtl.direction` | `rtl` همیشه راست‌چین، `auto` تشخیص خودکار برای هر پاراگراف |
| `cursorRtl.font.family` | نام فونت (مثلاً `Vazirmatn`)؛ خالی = فونت پیش‌فرض Cursor |
| `cursorRtl.font.size` | اندازه فونت به پیکسل (`0` = پیش‌فرض) |
| `cursorRtl.font.lineHeight` | فاصله خطوط (`0` = پیش‌فرض) |
| `cursorRtl.font.applyToInput` | اعمال فونت روی کادر ورودی چت |
| `cursorRtl.customCss` | CSS دلخواه اضافه |

برای انتخاب فونت از بین فونت‌های نصب‌شده، دستور **Cursor RTL: Select Persian Font...** را اجرا کنید. فونت باید روی سیستم نصب باشد (مثلاً [وزیرمتن](https://github.com/rastikerdar/vazirmatn)).

## نحوه کار

افزونه‌ها به DOM پنجره Cursor دسترسی ندارند؛ بنابراین این افزونه یک فایل `cursor-rtl.css` کنار `workbench.html` خود Cursor می‌سازد، یک `<link>` به آن اضافه می‌کند و checksum فایل را در `product.json` به‌روز می‌کند تا هشدار «نصب خراب است» نمایش داده نشود.

- بعد از هر آپدیت Cursor، افزونه هنگام اجرا پچ را دوباره اعمال می‌کند و درخواست Reload می‌دهد.
- برای حذف کامل تغییرات، قبل از حذف افزونه دستور **Cursor RTL: Disable RTL Chat** را بزنید (هنگام Uninstall هم به‌صورت خودکار پاک‌سازی انجام می‌شود).
- اگر Cursor در پوشه‌ای نصب شده که نیاز به دسترسی ادمین دارد، یک بار Cursor را با Administrator اجرا کنید.

</div>
