import 'package:flutter/foundation.dart';
import '../day.dart';
import '../repositories/day_repository.dart';

class DayProvider extends ChangeNotifier {
  final DayRepository _repo = DayRepository();
  List<DayEntry> _days = [];

  List<DayEntry> get days => List.unmodifiable(_days);

  Future<void> loadDays() async {
    _days = await _repo.loadDays();
    notifyListeners();
  }

  DayEntry? getById(int id) {
    try {
      return _days.firstWhere((d) => d.id == id);
    } catch (_) {
      return null;
    }
  }

  /// Toggles the completion status of a day entry.
  /// Also updates the streak count if a day is marked as completed.
  int _streakCount = 0;
  int get streakCount => _streakCount;

  /// Recalculates the current streak of consecutive completed days ending with the most recent date.
  void _updateStreak() {
    // Ensure days are sorted by date (assuming ISO format YYYY-MM-DD).
    _days.sort((a, b) => a.date.compareTo(b.date));
    int streak = 0;
    DateTime? previousDate;
    for (final day in _days) {
      if (day.status == 'Completed') {
        final currentDate = DateTime.tryParse(day.date);
        if (currentDate != null) {
          if (previousDate == null) {
            streak = 1;
          } else {
            final diff = previousDate.difference(currentDate).inDays.abs();
            if (diff == 1) {
              streak += 1;
            } else {
              streak = 1;
            }
          }
          previousDate = currentDate;
        }
      } else {
        // Break streak on non‑completed day.
        previousDate = null;
        streak = 0;
      }
    }
    _streakCount = streak;
  }

  void toggleStatus(int id) {
    final day = getById(id);
    if (day != null) {
      day.status = day.status == 'Completed' ? 'Not Started' : 'Completed';
      _save();
      _updateStreak();
    }
  }

  void updateNotes(int id, String notes) {
    final day = getById(id);
    if (day != null) {
      day.notes = notes;
      _save();
    }
  }

  /// Returns the count of completed days for given number of past days.
  int _countCompletedInPastDays(int days) {
    final now = DateTime.now();
    return _days.where((d) {
      if (d.status != 'Completed') return false;
      final date = DateTime.tryParse(d.date);
      if (date == null) return false;
      return now.difference(date).inDays <= days && now.isAfter(date);
    }).length;
  }

  int get dailyCount => _countCompletedInPastDays(1);
  int get weeklyCount => _countCompletedInPastDays(7);
  int get sixMonthCount => _countCompletedInPastDays(180);
  int get yearlyCount => _countCompletedInPastDays(365);

  Future<void> _save() async {
    await _repo.saveDays(_days);
    notifyListeners();
  }
}
