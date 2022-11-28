import 'package:flutter/material.dart';
import 'package:mobile/screens/LoginPage.dart';
import 'package:mobile/screens/AddPage.dart';
import 'package:mobile/screens/DisplayPage.dart';
import 'package:mobile/screens/AccountManager.dart';
import 'package:mobile/screens/CalendarView.dart';
import 'package:mobile/screens/MainPage.dart';

class Routes {
  static const String LOGINPAGE = '/LoginPage';
  static const String ADDPAGE = '/AddPage';
  static const String MAINPAGE = '/MainPage';
  static const String DISPLAYPAGE = '/DisplayPage';
  static const String ACCOUNTMANAGER = '/AccountManager';
  static const String CALENDARVIEW = '/CalendarView';

  // routes of pages in the app
  static Map<String, Widget Function(BuildContext)> get getroutes => {
    // '/': (context) => const AddPage(),
    '/': (context) => const LoginPage(),
    LOGINPAGE: (context) => const LoginPage(),
    ADDPAGE: (context) => const AddPage(),
    MAINPAGE: (context) => const MainPage(),
    DISPLAYPAGE: (context) => const DisplayPage(),
    ACCOUNTMANAGER: (context) => const AccountManager(),
    CALENDARVIEW: (context) => const CalendarView(),
  };
}