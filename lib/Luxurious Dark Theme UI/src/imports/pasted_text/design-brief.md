You are a UI/UX designer and Flutter developer tasked with creating the **best possible UI** for the **Full‑Stack Learning Tracker** app (Android‑only). The app must:

1. **Overall Visual Language**
   - Use a harmonious HSL‑based color palette (e.g., primary hue 210°, sat 70%, light 55%; complementary accent hue 30°, sat 80%, light 55%).
   - Apply glass‑morphism containers for cards (blur ≈ 8 px, semi‑transparent overlay: white @ 15% opacity for light mode, black @ 20% for dark mode).
   - Include smooth gradients (e.g., linear gradient from #1E3A8A → #3B82F6 on headers) and subtle drop‑shadows (elevation 4 dp, opacity 10%).
   - Adopt the **Inter** font family (body 400 14 sp, headings 600 18‑22 sp) from Google Fonts.
   - Provide a dark‑mode toggle with automatic system detection.

2. **Screen Architecture & Wireframes**
   - **Home Dashboard**
     * Top app bar with centered title “Today” and a trailing theme toggle icon.
     * Hero section: large glass‑morphic card showing today’s task title, short description, and a prominent “Mark Done” button (rounded, primary accent color, ripple effect).
     * Under the hero, a horizontal progress bar (rounded, gradient fill) indicating overall 0‑180‑day completion.
     * Two quick‑stats chips: current streak (fire icon) and total days completed (check‑circle icon). Chips animate on update.
   - **Day‑by‑Day Timeline**
     * Vertically scrollable `ListView` with `SliverStickyHeader` for month separators (e.g., “Month 1 – Foundations”).
     * Each day rendered as a glass‑morphic card:
       - Day number badge (circular, primary accent background, white text).
       - Title, short description (ellipsis after two lines).
       - Checkbox (animated material switch) for completion; when toggled, the card subtly pulses and the badge changes to a success gradient.
       - Swipe‑right to edit (slide‑in edit icon) and swipe‑left to delete (trash icon) with haptic feedback.
   - **Statistics & Insights**
     * Tabbed view (`TabBar`) with three tabs: “Progress”, “Streak”, “Categories”.
     * **Progress**: line chart (cumulative days vs. date) with smooth curve, gradient fill under the line, animated point markers.
     * **Streak**: bar chart (weekly streak length) with color‑coded bars (green = ≥ 5 days, amber = 3‑4, red = < 3).
     * **Categories**: pie/donut chart showing distribution of skill categories (e.g., Front‑end, Back‑end, DevOps, UI/UX); each slice expands on tap.
   - **Profile & Settings**
     * Profile header with avatar (circular, elevation 2 dp) and nickname.
     * Settings list (glass‑morphic tiles) for:
       - Theme toggle (light/dark/system).
       - Notification reminder schedule (time picker).
       - Export data (CSV/JSON) button with success snackbar.
       - “Reset Tracker” (danger‑colored tile with confirmation dialog).
   - **Onboarding Flow**
     * Three‑step carousel using `PageView`:
       1. Welcome with gradient background and animated logo.
       2. Explanation of 180‑day roadmap with illustration.
       3. Permission request for local storage (if needed) and “Get Started” button.

3. **Micro‑Animations & Interactions**
   - Hero card entrance: fade‑in + slide‑up (duration 300 ms).
   - Checkbox toggle: scale‑bounce (150 ms) with color transition.
   - Tab switching: slide‑fade animation.
   - Chart lines: draw‑path animation on appear (duration 800 ms).
   - Snackbar & toast messages: slide‑in from bottom, auto‑dismiss after 2 seconds.

4. **Accessibility & Responsiveness**
   - All touch targets ≥ 48 dp.
   - Semantic labels for icons and interactive widgets.
   - Contrast ratios ≥ 4.5:1 (WCAG AA) in both themes.
   - Adaptive layout: single‑column list on phones; two‑column grid on tablets (timeline cards side‑by‑side with stats).

5. **Implementation Hints for Flutter**
   - Use `flutter_glass` or `BackdropFilter` for glass‑morphism.
   - Leverage `fl_chart` for animated charts.
   - `provider` or `riverpod` for state management (already present in the project).
   - Keep UI code in `/lib/ui/` with separate subfolders: `dashboard/`, `timeline/`, `stats/`, `profile/`, `onboarding/`.
   - Define a `theme.dart` that contains `ColorScheme` built from the HSL palette, typography, and component themes (e.g., `ElevatedButtonTheme`, `CheckboxTheme`).

6. **Deliverables**
   - A fully‑styled `ThemeData` implementation (`app_theme.dart`).
   - UI widget files matching the screen architecture above.
   - Asset placeholders (logo, avatar) generated via the `generate_image` tool (e.g., `app_logo.png`, `default_avatar.png`).
   - Updated `pubspec.yaml` with new dependencies (`fl_chart`, `flutter_glass`, `google_fonts`).

**Final Instruction:**  
Generate a concise, high‑level design brief (≈ 300 words) that can be fed to an AI‑assisted UI generator. The brief must contain the visual language, screen wireframes, animation cues, accessibility notes, and implementation hints exactly as outlined above, formatted as plain text (no Markdown). Ensure the brief is self‑contained and does not reference external documents. 

**Output:**  
Provide only the design brief (plain‑text block) ready for copy‑paste.
