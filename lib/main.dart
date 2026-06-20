import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'models/providers/day_provider.dart';
import 'screens/home_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const FullStackTrackerApp());
}

class FullStackTrackerApp extends StatelessWidget {
  const FullStackTrackerApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => DayProvider()..loadDays(),
      child: MaterialApp(
        title: '180‑Day Full‑Stack Tracker',
        theme: ThemeData(
          brightness: Brightness.light,
          textTheme: GoogleFonts.interTextTheme(),
          primarySwatch: Colors.deepPurple,
        ),
        darkTheme: ThemeData(
          brightness: Brightness.dark,
          textTheme: GoogleFonts.interTextTheme(
            ThemeData(brightness: Brightness.dark).textTheme,
          ),
          primarySwatch: Colors.deepPurple,
        ),
        themeMode: ThemeMode.system,
        home: const HomeScreen(),
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}