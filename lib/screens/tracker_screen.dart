import 'package:flutter/material.dart';

class TrackerScreen extends StatelessWidget {
  const TrackerScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: AppBar(title: Text('Tracker')),
      body: Center(child: Text('Tracker screen placeholder')),
    );
  }
}
