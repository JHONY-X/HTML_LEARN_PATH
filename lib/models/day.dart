class DayEntry {
  final int id;
  final String date;
  final String phase;
  final String topic;
  final String resources;
  final String type;
  String status;
  String notes;

  DayEntry({
    required this.id,
    required this.date,
    required this.phase,
    required this.topic,
    required this.resources,
    required this.type,
    this.status = 'Not Started',
    this.notes = '',
  });

  factory DayEntry.fromCsv(List<String> fields) {
    // CSV format: id,Date,Phase,Topic,Resources,Type,Status,Notes
    return DayEntry(
      id: int.tryParse(fields[0]) ?? 0,
      date: fields.length > 1 ? fields[1] : '',
      phase: fields.length > 2 ? fields[2] : '',
      topic: fields.length > 3 ? fields[3] : '',
      resources: fields.length > 4 ? fields[4] : '',
      type: fields.length > 5 ? fields[5] : '',
      status: fields.length > 6 ? fields[6] : 'Not Started',
      notes: fields.length > 7 ? fields[7] : '',
    );
  }

  List<String> toCsv() => [
        id.toString(),
        date,
        phase,
        topic,
        resources,
        type,
        status,
        notes,
      ];
}
