import 'dart:convert';
import 'package:flutter/services.dart' show rootBundle;
import 'package:shared_preferences/shared_preferences.dart';
import '../models/day.dart';

class DayRepository {
  static const _prefsKey = 'day_entries';

  /// Load entries from the CSV asset. If persisted data exists, use it instead.
  Future<List<DayEntry>> loadDays() async {
    final prefs = await SharedPreferences.getInstance();
    final stored = prefs.getString(_prefsKey);
    if (stored != null) {
      return _parseCsv(stored);
    }
    // Load from asset
    final csvString = await rootBundle.loadString('assets/fullstack_180_day_tracker_template.csv');
    // Persist for future launches
    await prefs.setString(_prefsKey, csvString);
    return _parseCsv(csvString);
  }

  /// Save the entire list back to SharedPreferences as CSV.
  Future<void> saveDays(List<DayEntry> days) async {
    final prefs = await SharedPreferences.getInstance();
    final csv = _toCsv(days);
    await prefs.setString(_prefsKey, csv);
  }

  List<DayEntry> _parseCsv(String csv) {
    final lines = const LineSplitter().convert(csv.trim());
    return lines
        .where((l) => l.isNotEmpty)
        .map((line) => DayEntry.fromCsv(line.split(',')))
        .toList();
  }

  String _toCsv(List<DayEntry> days) {
    final buffer = StringBuffer();
    for (var d in days) {
      buffer.writeln(d.toCsv().join(','));
    }
    return buffer.toString();
  }
}
