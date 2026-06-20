import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:printing/printing.dart';
import '../models/providers/day_provider.dart';

class StatsScreen extends StatelessWidget {
  const StatsScreen({Key? key}) : super(key: key);

  // Helper to build a simple bar chart for a single value
  Widget _buildBarChart(String label, int value, Color color) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(label, style: const TextStyle(fontWeight: FontWeight.bold)),
        const SizedBox(height: 8),
        SizedBox(
          height: 150,
          width: 60,
          child: BarChart(
            BarChartData(
              barGroups: [
                BarChartGroupData(x: 0, barRods: [
                  BarChartRodData(
                    toY: value.toDouble(),
                    width: 40,
                    color: color,
                    borderRadius: BorderRadius.circular(4),
                  ),
                ]),
              ],
              titlesData: const FlTitlesData(
                leftTitles:
                    AxisTitles(sideTitles: SideTitles(showTitles: false)),
                bottomTitles:
                    AxisTitles(sideTitles: SideTitles(showTitles: false)),
                topTitles:
                    AxisTitles(sideTitles: SideTitles(showTitles: false)),
                rightTitles:
                    AxisTitles(sideTitles: SideTitles(showTitles: false)),
              ),
              borderData: FlBorderData(show: false),
              gridData: const FlGridData(show: false),
            ),
          ),
        ),
        const SizedBox(height: 4),
        Text(value.toString(), style: const TextStyle(fontSize: 16)),
      ],
    );
  }

  // Generate PDF report with stats
  Future<void> _generatePdf(BuildContext context, DayProvider provider) async {
    final pdf = pw.Document();
    final now = DateTime.now();
    pdf.addPage(
      pw.Page(
        pageFormat: PdfPageFormat.a4,
        build: (pw.Context c) => pw.Column(
          crossAxisAlignment: pw.CrossAxisAlignment.start,
          children: [
            pw.Text('Full‑Stack Tracker Report',
                style:
                    pw.TextStyle(fontSize: 24, fontWeight: pw.FontWeight.bold)),
            pw.SizedBox(height: 12),
            pw.Text('Generated on ${now.toIso8601String()}'),
            pw.SizedBox(height: 20),
            pw.Text('Streak: ${provider.streakCount} days'),
            pw.Text('Daily Completed: ${provider.dailyCount}'),
            pw.Text('Weekly Completed: ${provider.weeklyCount}'),
            pw.Text('Last 6‑Months Completed: ${provider.sixMonthCount}'),
            pw.Text('Yearly Completed: ${provider.yearlyCount}'),
          ],
        ),
      ),
    );
    await Printing.layoutPdf(
        onLayout: (PdfPageFormat format) async => pdf.save());
  }

  // Simple reminder dialog
  void _showReminderDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Practice Reminder'),
        content: const Text(
            'Don\'t forget to practice your full‑stack skills today!'),
        actions: [
          TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('OK')),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<DayProvider>(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Stats & Reports'),
        actions: [
          IconButton(
            tooltip: 'Download PDF report',
            icon: const Icon(Icons.picture_as_pdf),
            onPressed: () => _generatePdf(context, provider),
          ),
          IconButton(
            tooltip: 'Practice reminder',
            icon: const Icon(Icons.notification_add),
            onPressed: () => _showReminderDialog(context),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Current Streak: ${provider.streakCount} day(s)',
                style:
                    const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _buildBarChart(
                    'Daily', provider.dailyCount, Colors.deepPurpleAccent),
                _buildBarChart('Weekly', provider.weeklyCount, Colors.indigo),
                _buildBarChart('6 M', provider.sixMonthCount, Colors.teal),
                _buildBarChart('Year', provider.yearlyCount, Colors.orange),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
