# Multi-Language Localization

Our application provides a seamless user experience by supporting **multi-language localization** across both the frontend and backend. This ensures users can interact with the system in their preferred language, maintaining consistency throughout the application.

---

## Supported Languages

The application currently supports the following languages:

- **English (en)**
- **Portuguese (pt)**
- **French (fr)**
- **Hindi (hi)**
- **Gujarati (gu)**
- **Oriya (or)**
- **Hausa (ha)**
- **Igbo (ig)**
- **Yoruba (yo)**

---

## Frontend Localization

The frontend utilizes `i18next` and `react-i18next` libraries for dynamic translation management, enabling real-time language switching and efficient resource loading.

### Key Concepts

* **Base Language:** English (en) serves as the foundation, defining the structure and content keys.
* **Inheritance:** Other languages inherit this structure, ensuring consistency.
* **Language Persistence:** The selected language is stored in local storage for subsequent sessions.

### Implementation Details

#### 1. Translation Frameworks

* `i18next` and `react-i18next` are used for dynamic translation management.

#### 2. Language Structure & Definition

* A defined set of supported languages is used for the mobile experience.
* English is the base language.
* Other languages use the same data structure as English.

#### 3. Language Management (LanguageManager)

* Detects user preferences from local storage.
* Falls back to device locale settings if no preference is found.
* Manages the state of internationalization components.
* Persists language selection across sessions.

#### 4. Language-Dependent Features

* **Form Validation Messages:** Error messages adapt to the selected language.
* **Date and Time Formatting:**
    * Uses `date-fns` with locale-specific formats.
    * Supports custom locale plugins for languages requiring ICU Locales.
* **Layout Direction (LTR/RTL):** Automatically adjusts based on the selected language.

#### 5. Initialization & Utilities

* `_initializeI18nConfiguration` function initializes translations.
* Default language is English (en) with fallback behavior.
* `useI18n` hook ensures rendering after resource loading.
* `useTranslationUtils` provides dynamic translation and `zodResolver` integration.

---

## Backend Localization

The backend provides localization support specifically for user-facing messages.

### Django Implementation

* Utilizes Django's built-in internationalization framework.
* Essential settings:

    ```python
    LANGUAGE_CODE = "en-us"
    TIME_ZONE = "UTC"
    USE_I18N = True
    USE_L10N = True
    USE_TZ = True
    ```

### Dynamic Language Override

Django REST Framework handles multiple languages through Django's internationalization (i18n) system, enabling API responses in the user's preferred language.

#### Implementation Process

1.  **Mark Text for Translation:** Apply `translation.gettext()` to identify translatable text.
    ```python
    from django.utils import translation
    message = translation.gettext("welcome")
    ```
2.  **Generate Translation Files:** Execute `python manage.py makemessages -l <language_code>` to create `.po` files (e.g., for French: `python manage.py makemessages -l fr`). These files store original text alongside translations.
3.  **Add Translations:** Edit the `.po` files with translations for each target language.
4.  **Compile Translation Files:** Run `python manage.py compilemessages` to create binary `.mo` files that Django uses for efficient translation lookups.

#### Translation Tool: POEdit

[POEdit](https://github.com/vslavik/poedit){:target="_blank"} enhances the translation workflow by:

* Providing an intuitive interface for editing `.po` files.
* Highlighting missing translations.
* Maintaining correct file formatting.

#### Context-Specific Language Selection

For specific use cases like emails or SMS messages, set the language temporarily:

```python
from django.utils import translation
from example.apps.user.models import User
from example.utils.services.sms import send_sms

def send_message_in_user_language(user_id, phone, link):
    user = User.objects.get(id=user_id)
    with translation.override(user.language or 'en'):
        # Get translated message with link
        message = translation.gettext("sms_user_invite").format(link=link)
    # Send the message
    send_sms(phone, message)
    return f"Invite sent to {phone}"
```

This code block ensures messages appear in the recipient's preferred language.

#### Key Considerations

* **Marker Consistency:** Use `translation.gettext()` uniformly across the codebase for all user-facing text.
* **Quality Control:** Test translations regularly for accuracy and contextual correctness.
* **Format Standardization:** Keep variable formats (like `{link}`) consistent across all language files.
* **Coverage Tracking:** Use POEdit to identify and fill translation gaps before deployment.
* **Language Fallbacks:** Implement backup options when translations aren't available in a user's language.
* **Contextual Notes:** Add clear comments in translation files explaining string purpose and usage.
