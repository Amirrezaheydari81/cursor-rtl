<div dir="rtl">

# Cursor RTL — چت فارسی و راست‌چین در Cursor

افزونه‌ای برای [Cursor](https://cursor.com) که پنل چت هوش مصنوعی را برای متن فارسی (و سایر زبان‌های راست‌به‌چپ) درست راست‌چین می‌کند و اجازه می‌دهد فونت فارسی دلخواه خود را از تنظیمات انتخاب کنید.

## فهرست

- [امکانات](#امکانات)
- [پیش‌نیازها](#پیشنیازها)
- [نصب](#نصب)
- [اولین اجرا](#اولین-اجرا)
- [انتخاب فونت فارسی](#انتخاب-فونت-فارسی)
- [تنظیمات](#تنظیمات)
- [دستورها](#دستورها)
- [آپدیت Cursor](#آپدیت-cursor)
- [غیرفعال‌سازی و حذف](#غیرفعالسازی-و-حذف)
- [رفع مشکلات](#رفع-مشکلات)
- [نحوه کار افزونه](#نحوه-کار-افزونه)
- [ساخت از سورس و توسعه](#ساخت-از-سورس-و-توسعه)

## امکانات

- راست‌چین شدن پاسخ‌های هوش مصنوعی، پیام‌های شما و کادر ورودی چت
- چیدمان درست لیست‌ها (بولت و شماره در سمت راست)
- جدول‌های راست‌چین با اسکرول افقی برای جدول‌های عریض
- لیست کارها (To-do)، Plan mode، پرسش‌نامه‌ها و هدر مراحل
- **بلاک‌های کد و کدهای درون‌خطی همیشه چپ‌چین** و با فونت ادیتور باقی می‌مانند
- انتخاب فونت از بین فونت‌های نصب‌شده روی سیستم (فونت‌های فارسی بالای فهرست)
- تنظیم اندازه فونت و فاصله خطوط چت
- حالت جهت خودکار: پاراگراف فارسی راست‌چین و پاراگراف انگلیسی چپ‌چین
- امکان افزودن CSS دلخواه
- اعمال مجدد خودکار بعد از آپدیت Cursor
- بدون هشدار «Your Cursor installation appears to be corrupt»
- بازگردانی کامل فایل‌های Cursor با یک دستور

## پیش‌نیازها

- Cursor نسخه دسکتاپ (ویندوز، مک یا لینوکس)
- دسترسی نوشتن روی پوشه نصب Cursor (در نصب عادی ویندوز، یعنی `%LOCALAPPDATA%\Programs\cursor`، این دسترسی وجود دارد)
- یک فونت فارسی نصب‌شده روی سیستم، مثلاً [وزیرمتن](https://github.com/rastikerdar/vazirmatn/releases)

> افزونه هیچ فونتی همراه خود ندارد و از فونت‌های نصب‌شده روی سیستم استفاده می‌کند.

## نصب

### روش ۱: از فایل VSIX (پیشنهادی)

1. فایل `cursor-rtl-x.y.z.vsix` را از بخش [Releases](../../releases) دانلود کنید یا [خودتان بسازید](#ساخت-از-سورس-و-توسعه).
2. در Cursor کلیدهای `Ctrl+Shift+P` (در مک `Cmd+Shift+P`) را بزنید.
3. دستور `Extensions: Install from VSIX...` را اجرا کنید و فایل را انتخاب کنید.

یا با کشیدن و رها کردن فایل `.vsix` روی پنل Extensions.

### روش ۲: از خط فرمان

</div>

```bash
cursor --install-extension cursor-rtl-1.0.0.vsix
```

<div dir="rtl">

## اولین اجرا

بعد از نصب، افزونه خودکار فعال می‌شود و پیغامی با دکمه **Reload Window** نشان می‌دهد. روی آن کلیک کنید تا پنجره دوباره بارگذاری شود و چت راست‌چین شود.

اگر پیغام را از دست دادید، از Command Palette دستور `Developer: Reload Window` را اجرا کنید.

> فونت پیش‌فرض `Vazirmatn` است. اگر این فونت را نصب ندارید، چت با فونت پیش‌فرض سیستم نمایش داده می‌شود تا فونت دیگری انتخاب کنید.

## انتخاب فونت فارسی

### روش ساده: انتخاب از فهرست

1. `Ctrl+Shift+P` ← دستور **`Cursor RTL: Select Persian Font...`**
2. فهرستی از فونت‌های نصب‌شده نمایش داده می‌شود؛ فونت‌های فارسی شناخته‌شده (وزیرمتن، شبنم، ساحل، صمیم، استعداد، ایران‌سنس، یکان بخ، دانا، پیدا، بی‌نازنین و…) در بخش **Persian fonts** در بالای فهرست قرار دارند.
3. با تایپ کردن، فهرست فیلتر می‌شود. فونت را انتخاب کنید و سپس Reload Window را بزنید.

گزینه‌های ویژه در بالای فهرست:

- **Enter a font name...** — وارد کردن دستی نام فونت (برای فونتی که در فهرست نیست)
- **Cursor default font** — بازگشت به فونت پیش‌فرض Cursor

همین دستور از داخل صفحه تنظیمات هم با لینک «Pick from installed fonts» زیر تنظیم فونت در دسترس است.

### روش دستی: از Settings

`Ctrl+,` را بزنید، عبارت `Cursor RTL` را جستجو کنید و در فیلد **Font: Family** نام فونت را بنویسید. می‌توانید چند فونت را با کاما جدا کنید؛ اولین فونتی که نصب باشد استفاده می‌شود:

</div>

```text
Vazirmatn, Shabnam, Tahoma
```

<div dir="rtl">

> نام فونت باید همان «Family name» فونت باشد، نه نام فایل آن. مثلاً `Vazirmatn` درست است، نه `Vazirmatn-Regular.ttf`.

## تنظیمات

همه تنظیمات در بخش **Cursor RTL** صفحه Settings هستند. بعد از تغییر هر تنظیم، پیغام Reload Window ظاهر می‌شود.

| تنظیم | پیش‌فرض | توضیح |
| --- | --- | --- |
| `cursorRtl.enabled` | `true` | روشن/خاموش کردن راست‌چین. خاموش کردن، پچ را از فایل‌های Cursor پاک می‌کند. |
| `cursorRtl.direction` | `"rtl"` | `rtl`: همیشه راست‌به‌چپ. `auto`: تشخیص خودکار برای هر پاراگراف بر اساس اولین حرف آن. |
| `cursorRtl.font.family` | `"Vazirmatn"` | نام فونت چت. خالی = فونت پیش‌فرض Cursor. |
| `cursorRtl.font.size` | `0` | اندازه فونت چت به پیکسل. `0` = پیش‌فرض Cursor. |
| `cursorRtl.font.lineHeight` | `0` | فاصله خطوط (مثلاً `1.8`). `0` = پیش‌فرض Cursor. |
| `cursorRtl.font.applyToInput` | `true` | اعمال فونت روی کادر ورودی چت. |
| `cursorRtl.customCss` | `""` | CSS اضافه که بعد از قوانین افزونه اعمال می‌شود. |

### نمونه تنظیمات در `settings.json`

</div>

```jsonc
{
  "cursorRtl.enabled": true,
  "cursorRtl.direction": "auto",
  "cursorRtl.font.family": "Vazirmatn, Tahoma",
  "cursorRtl.font.size": 14,
  "cursorRtl.font.lineHeight": 1.9,
  "cursorRtl.font.applyToInput": true
}
```

<div dir="rtl">

### کدام حالت جهت را انتخاب کنم؟

- **`rtl`** — اگر تقریباً همیشه فارسی می‌نویسید و جواب فارسی می‌گیرید. لیست‌ها، To-do و جدول‌ها کاملاً راست‌چین می‌شوند.
- **`auto`** — اگر چت‌هایتان ترکیبی از فارسی و انگلیسی است. هر پاراگراف بر اساس اولین حرفش جهت می‌گیرد، اما بولت لیست‌ها و چیدمان To-do مثل حالت پیش‌فرض Cursor باقی می‌ماند.

### نمونه CSS دلخواه

مثلاً برای بزرگ‌تر کردن فونت تیترهای پاسخ:

</div>

```css
.markdown-root h1, .markdown-root h2 { font-size: 1.3em; }
```

<div dir="rtl">

## دستورها

همه دستورها از Command Palette (`Ctrl+Shift+P`) با پیشوند `Cursor RTL` در دسترس‌اند:

| دستور | کار |
| --- | --- |
| `Cursor RTL: Enable RTL Chat` | فعال‌سازی (یا اعمال مجدد اگر از قبل فعال است) |
| `Cursor RTL: Disable RTL Chat (Restore Cursor Files)` | حذف پچ و بازگردانی کامل فایل‌های Cursor |
| `Cursor RTL: Select Persian Font...` | انتخاب فونت از فهرست فونت‌های نصب‌شده |
| `Cursor RTL: Re-apply Patch` | پاک کردن و نوشتن دوباره پچ (برای وقتی که چیزی درست کار نمی‌کند) |

## آپدیت Cursor

آپدیت Cursor فایل‌های برنامه را جایگزین می‌کند و پچ پاک می‌شود. نیازی به کاری نیست: افزونه در هر بار اجرای Cursor وضعیت را بررسی می‌کند، پچ را دوباره اعمال می‌کند و پیغام Reload Window می‌دهد. بعد از یک Reload، چت دوباره راست‌چین است.

## غیرفعال‌سازی و حذف

- **غیرفعال‌سازی موقت:** دستور `Cursor RTL: Disable RTL Chat` یا خاموش کردن `cursorRtl.enabled`، سپس Reload Window.
- **حذف کامل:** ابتدا دستور `Cursor RTL: Disable RTL Chat` را بزنید و Reload کنید، سپس افزونه را از پنل Extensions حذف (Uninstall) کنید.

> هنگام Uninstall هم افزونه به‌صورت خودکار پاک‌سازی می‌کند (این کار در اجرای بعدی Cursor انجام می‌شود)، اما روش بالا مطمئن‌تر است.
>
> ⚠️ اگر افزونه را فقط از پنل Extensions **Disable** کنید، افزونه اجرا نمی‌شود و پچ سر جایش می‌ماند. برای برداشتن راست‌چین از دستور Disable خود افزونه استفاده کنید.

## رفع مشکلات

**بعد از نصب، چت هنوز چپ‌چین است.**
پنجره را Reload کنید (`Developer: Reload Window`). اگر درست نشد، دستور `Cursor RTL: Re-apply Patch` را اجرا کنید.

**خطای «install folder is not writable» یا `EPERM` / `EACCES`.**
Cursor در پوشه‌ای نصب شده که کاربر شما اجازه نوشتن در آن را ندارد.

- ویندوز: یک بار Cursor را با **Run as administrator** باز کنید و دستور `Cursor RTL: Re-apply Patch` را بزنید.
- مک/لینوکس: به کاربر خود دسترسی نوشتن بدهید، مثلاً:

</div>

```bash
# macOS
sudo chown -R $(whoami) "/Applications/Cursor.app/Contents/Resources/app/out/vs/code"
sudo chown $(whoami) "/Applications/Cursor.app/Contents/Resources/app/product.json"
```

<div dir="rtl">

**فونت تغییر نکرده است.**

- مطمئن شوید فونت روی سیستم نصب است و نام وارد‌شده Family name آن است (از دستور Select Persian Font استفاده کنید تا نام درست انتخاب شود).
- اگر فونت را تازه نصب کرده‌اید، Cursor را کامل ببندید و دوباره باز کنید.

**پیغام «Your Cursor installation appears to be corrupt» ظاهر شد.**
افزونه checksum را به‌روز می‌کند و این پیغام نباید ظاهر شود. اگر ظاهر شد، دستور `Cursor RTL: Re-apply Patch` را اجرا کنید. می‌توانید با گزینه «Don't Show Again» هم آن را ببندید؛ مشکلی ایجاد نمی‌کند.

**بعد از یک آپدیت Cursor بخشی از چت راست‌چین نیست.**
احتمالاً Cursor نام کلاس‌های رابط کاربری را تغییر داده است. با `Help > Toggle Developer Tools` کلاس عنصر را پیدا کنید و قانون مناسب را در `cursorRtl.customCss` اضافه کنید، مثلاً:

</div>

```css
.new-chat-class { direction: rtl !important; text-align: right !important; }
```

<div dir="rtl">

## نحوه کار افزونه

افزونه‌های Cursor/VS Code در یک پروسس جدا (Extension Host) اجرا می‌شوند و به DOM پنجره اصلی دسترسی ندارند. برای همین این افزونه:

1. بر اساس تنظیمات شما فایل `cursor-rtl.css` را کنار `workbench.html` خود Cursor می‌سازد.
2. یک تگ `<link>` بین دو کامنت نشانه‌گذار (`cursor-rtl:start` و `cursor-rtl:end`) به `workbench.html` اضافه می‌کند.
3. checksum فایل `workbench.html` را در `product.json` به‌روز می‌کند تا Cursor هشدار خرابی نصب ندهد.

هنگام غیرفعال‌سازی، دقیقاً همان بلاک حذف و checksum دوباره محاسبه می‌شود؛ بنابراین فایل‌ها بایت‌به‌بایت به حالت اول برمی‌گردند.

فایل‌هایی که تغییر می‌کنند (مسیر نسبت به پوشه نصب Cursor، مثلاً `%LOCALAPPDATA%\Programs\cursor\resources\app` در ویندوز):

- `out/vs/code/electron-sandbox/workbench/workbench.html`
- `out/vs/code/electron-sandbox/workbench/cursor-rtl.css` (فایل جدید)
- `product.json` (فقط مقدار checksum همان فایل)

## ساخت از سورس و توسعه

پیش‌نیاز: [Node.js](https://nodejs.org) نسخه ۱۸ یا بالاتر.

</div>

```bash
git clone https://github.com/Amirrezaheydari81/cursor-rtl.git
cd cursor-rtl
npm run package
```

<div dir="rtl">

خروجی فایل `cursor-rtl-<version>.vsix` در ریشه پروژه است. پروژه وابستگی (dependency) ندارد و نیاز به build ندارد.

برای اجرای آزمایشی بدون نصب، پوشه پروژه را در Cursor باز کنید و `F5` بزنید (Run Extension).

ساختار پروژه:

</div>

```text
cursor-rtl/
├─ package.json            مانیفست افزونه، دستورها و تنظیمات
├─ package.nls.json        متن‌های انگلیسی تنظیمات و دستورها
├─ package.nls.fa.json     متن‌های فارسی تنظیمات و دستورها
├─ l10n/                   ترجمه فارسی پیغام‌های افزونه
└─ src/
   ├─ extension.js         فعال‌سازی، دستورها و همگام‌سازی با تنظیمات
   ├─ css.js               ساخت CSS از روی تنظیمات
   ├─ patcher.js           پچ workbench.html و به‌روزرسانی checksum
   ├─ fonts.js             خواندن فونت‌های نصب‌شده (ویندوز/مک/لینوکس)
   └─ uninstall.js         پاک‌سازی هنگام حذف افزونه
```

<div dir="rtl">

> متن تنظیمات و پیغام‌های افزونه به دو زبان انگلیسی و فارسی است؛ اگر زبان نمایش Cursor فارسی باشد، نسخه فارسی نمایش داده می‌شود.

## مجوز

[MIT](LICENSE)

</div>
