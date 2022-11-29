import 'package:flutter/material.dart';
import 'package:mobile/screens/LoginPage.dart';
import 'package:mobile/screens/MainPage.dart';
import 'package:mobile/screens/PaymentHist.dart';
import 'package:mobile/screens/AccountManager.dart';
import 'package:mobile/screens/CalendarView.dart';

class Routes {
  static const String LOGINPAGE = '/LoginPage';
  static const String MAINPAGE = '/MainPage';
  static const String PAYMENTHIST = '/PaymentHist';
  static const String ACCOUNTMANAGER = '/AccountManager';
  static const String CALENDARVIEW = '/CalendarView';

  // routes of pages in the app
  static Map<String, Widget Function(BuildContext)> get getroutes => {
    '/': (context) => const LoginPage(),
    LOGINPAGE: (context) => const LoginPage(),
    MAINPAGE: (context) => const MainPage(),
    PAYMENTHIST: (context) => const PaymentHist(),
    ACCOUNTMANAGER: (context) => const AccountManager(),
    CALENDARVIEW: (context) => const CalendarView(),
  };
}