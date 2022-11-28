import 'dart:collection';
import 'package:calendar_view/calendar_view.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:percent_indicator/linear_percent_indicator.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:mobile/global.dart' as global;
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:intl/intl.dart';
import '../models/bill.dart';
import '../base_client.dart';
import '../models/myCategory.dart';

String id = global.userId;
final formKey = GlobalKey<FormState>();
TextEditingController bill = TextEditingController();
final billName = TextEditingController();
final billPrice = TextEditingController();
final billCategory = TextEditingController();
DateTime _billDateStart = DateTime.now();
DateTime _billDateEnd = DateTime.now();
final billStart = TextEditingController();
final billEnd = TextEditingController();
final categoryAdd = TextEditingController();

showAddBillDialog(BuildContext context) {}

void clearFields() {
  billName.clear();
  billPrice.clear();
  billCategory.clear();
}

class CalendarView extends StatefulWidget {
  const CalendarView({super.key});
  @override
  State<CalendarView> createState() => _CalendarViewState();
}

_showToast(msg, error) => Fluttertoast.showToast(
      msg: msg,
      fontSize: 18,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: error
          ? Color(0xFFFF0000).withOpacity(.8)
          : Colors.green.withOpacity(.9),
      textColor: Colors.white,
    );

class _CalendarViewState extends State<CalendarView> {
  int selectedIndex = 3;
  List<String> routes = [
    '/MainPage',
    '/DisplayPage',
    '/AddPage',
    '/CalendarView',
    '/AccountManager'
  ];
  List<Bill> allBills = <Bill>[];
  CalendarFormat format = CalendarFormat.month;
  MyCategory? categoryValue;
  List<MyCategory> getAllCategories = <MyCategory>[];
  Map<DateTime, List<Bill>> billsMap = <DateTime, List<Bill>>{};

  DateTime selectedDay = DateTime.now();
  late DateTime focusedDay;
  late final ValueNotifier<List<Bill>> selectedBills;

  @override
  void initState() {
    billsMap = {};
    selectedBills = ValueNotifier(_getSelectedBills(selectedDay!));
    focusedDay = selectedDay;
    super.initState();
  }

  List<Bill> _getSelectedBills(DateTime date) {
    return allBills
        .where((b) => DateFormat('yyyy-MM-dd')
            .parse(b.startDate)
            .compareWithoutTime(selectedDay))
        .toList();
  }

  @override
  void dispose() {
    selectedBills.dispose();
    super.dispose();
  }

  Future<void> getAllCat() async {
    id = global.userId;
    // getAllCategories = <MyCategory>[];

    var response = await BaseClient().getCategories(id).catchError((err) {
      print("Fail");
    });
    if (response == null) {
      _showToast("Could not get", true);
      print("response null");
    } else {
      print("Got Categories");
      print(id);
      //print(response);
      List<MyCategory> allCategories = getCategoriesFromJson(response);
      for (MyCategory c in allCategories) {
        //print(c.name);
      }

      if (allCategories.length == 0) {
        _showToast("No Categories", true);
      }
      // var addVal = MyCategory(name: "Add New");
      // allCategories.add(addVal);
      setState(() {
        getAllCategories = allCategories;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    void onTabTapped(index) {
      print(index);
      selectedIndex = index;
      Navigator.pushNamed(context, routes[index]);
    }

    Future<void> getAllBills() async {
      id = global.userId;

      var response = await BaseClient().getBills(id).catchError((err) {
        print("Fail");
      });
      if (response == null) {
        _showToast("Could not get", true);
        print("response null");
      } else {
        print("Got bills");
        print(id);
        //print(response);
        List<Bill> allBillsTemp = getBillsFromJson(response);

        if (allBills.isEmpty) {
          _showToast("No bills", true);
        }
        setState(() {
          allBills = allBillsTemp;
        });
      }
    }

    getAllBills();

    return Container(
      // BACKGROUND AND APPBAR
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          stops: [0.2, 0.7, 0.9],
          colors: [
            Color(0xFF479CE0),
            Color(0xFF9ECFA2),
            Color(0xFFE7E233),
          ],
        ),
      ),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        appBar: AppBar(
          centerTitle: false,
          title: const Text(
            'Budgie',
            style: TextStyle(
                fontSize: 35,
                color: Color(0xFF2D4B03),
                fontWeight: FontWeight.bold),
          ),
          actions: <Widget>[
            Padding(
              padding: EdgeInsets.only(right: 20.0, bottom: 6.0),
              child: GestureDetector(
                onTap: () {
                  Navigator.pushNamed(context, '/MainPage');
                },
                // child: Icon(Icons.logout, color: Color(0xFF2D4B03), size: 35.0,),
                child: Image.asset(
                  'assets/images/budgie.png',
                  scale: 0.1,
                ),
              ),
            )
          ],
          automaticallyImplyLeading: false,
          flexibleSpace: Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                  colors: [
                    Color(0xFFb3e5fc),
                    Color(0xFFb3e5fc),
                  ],
                  begin: FractionalOffset(0.0, 0.0),
                  end: FractionalOffset(1.0, 0.0),
                  stops: [0.0, 1.0],
                  tileMode: TileMode.clamp),
            ),
          ),
        ),

        body: SingleChildScrollView(
          child: Column(
            children: [
              TableCalendar(
                focusedDay: selectedDay,
                firstDay: DateTime(2000, 1, 1),
                lastDay: DateTime(2050, 12, 31),
                calendarFormat: format,
                onFormatChanged: (CalendarFormat _format) {
                  setState(() {
                    format = _format;
                    getAllBills();
                  });
                },
                onPageChanged: (selectDay) {
                  selectedDay = selectDay;
                },
                daysOfWeekVisible: true,
                onDaySelected: (DateTime selectDay, DateTime focusDay) {
                  setState(() {
                    selectedDay = selectDay;
                    focusedDay = focusDay;
                  });
                },
                selectedDayPredicate: (DateTime date) {
                  return isSameDay(selectedDay, date);
                },
                eventLoader: _getSelectedBills,
                calendarStyle: CalendarStyle(
                  isTodayHighlighted: true,
                  selectedDecoration: BoxDecoration(
                    color: Colors.blue,
                    shape: BoxShape.rectangle,
                    borderRadius: BorderRadius.circular(5.0),
                  ),
                  selectedTextStyle: TextStyle(color: Colors.white),
                  todayDecoration: BoxDecoration(
                    color: Colors.purpleAccent,
                    shape: BoxShape.rectangle,
                    borderRadius: BorderRadius.circular(5.0),
                  ),
                  defaultDecoration: BoxDecoration(
                    shape: BoxShape.rectangle,
                    borderRadius: BorderRadius.circular(5.0),
                  ),
                  weekendDecoration: BoxDecoration(
                    shape: BoxShape.rectangle,
                    borderRadius: BorderRadius.circular(5.0),
                  ),
                ),
              ),
              SizedBox(height: 30),
              ..._getSelectedBills(selectedDay).map(
                (Bill bill) => Column(
                  children: <Widget>[
                    SizedBox(height: 20),
                    Container(
                      padding: EdgeInsets.only(
                          top: 2.0, left: 10.0, right: 10.0, bottom: 5.0),
                      width: MediaQuery.of(context).size.width,
                      height: 100,
                      decoration: BoxDecoration(
                          color: Color(0xddb3e5fc),
                          borderRadius: BorderRadius.circular(8),
                          boxShadow: [
                            BoxShadow(
                                blurRadius: 8,
                                offset: Offset(0, 15),
                                color: Color(0xffe3e9e7).withOpacity(.5),
                                spreadRadius: -9)
                          ]),
                      child: Column(
                        children: <Widget>[
                          Padding(
                            padding: EdgeInsets.only(bottom: 5.0),
                            child: Text(
                              "${bill.name}",
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        // BOTTOM NAV
        bottomNavigationBar: BottomNavigationBar(
          elevation: 0,
          selectedItemColor: Color(0xFF2D4B03),
          unselectedItemColor: Colors.black,
          showSelectedLabels: true,
          currentIndex: selectedIndex,
          onTap: onTabTapped,
          items: const [
            BottomNavigationBarItem(
                icon: Icon(
                  Icons.home,
                  size: 35.0,
                ),
                label: 'Home'),
            BottomNavigationBarItem(
                icon: Icon(Icons.addchart, size: 35.0), label: 'Budget'),
            BottomNavigationBarItem(
                icon: Icon(Icons.add_circle_outline, size: 35.0),
                label: 'Bill'),
            BottomNavigationBarItem(
                icon: Icon(Icons.calendar_month, size: 35.0),
                label: 'Calendar'),
            BottomNavigationBarItem(
                icon: Icon(Icons.account_circle, size: 35.0), label: 'Account'),
          ],
        ),
      ),
    );
  }
}
