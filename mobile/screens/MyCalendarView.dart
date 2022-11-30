import 'dart:collection';
import 'package:calendar_view/calendar_view.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:get/get.dart';
import 'package:percent_indicator/linear_percent_indicator.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:mobile/global.dart' as global;


import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:intl/intl.dart';
import 'package:time_machine/time_machine.dart';
import '../models/bill.dart';
import '../base_client.dart';
import '../models/myCategory.dart';

String id = global.userId;

List<Appointment>? appointmentDetails = <Appointment>[];
CalendarController? _calendarController = CalendarController();
MeetingDataSource? _dataSource;

class MyCalendarView extends StatefulWidget {
  const MyCalendarView({super.key});
  @override
  State<MyCalendarView> createState() => _MyCalendarViewState();
}

class _MyCalendarViewState extends State<MyCalendarView> {
  String? billName;
  String? billStart;
  String? billEnd;
  String? billPaid;

  int selectedIndex = 3;
  List<String> routes = [
    '/MainPage',
    '/DisplayPage',
    '/AddPage',
    '/CalendarView',
    '/AccountManager'
  ];

  Future<int?>? gotData;
  int yesData = 0;

  List<Bill> allBills = <Bill>[];
  List<MyCategory> getAllCategories = <MyCategory>[];

  MyCategory? categoryValue;

  _showToast(msg, error) => Fluttertoast.showToast(
    msg: msg,
    fontSize: 18,
    gravity: ToastGravity.BOTTOM,
    backgroundColor: error
        ? Color(0xFFFF0000).withOpacity(.8)
        : Colors.green.withOpacity(.9),
    textColor: Colors.white,
  );

  Future<int?> getAllData() async {
    id = global.userId;

    var response = await BaseClient().getCategories(id).catchError((err) {print("Fail");});
    if (response == null) {
      _showToast("Could not get", true);
      print("response null");
    }
    else {
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

      setState(() {
        getAllCategories = allCategories;
      });
    }

    response = await BaseClient().getBills(id).catchError((err) {print("Fail");});
    if (response == null) {
      _showToast("Could not get", true);
      print("response null");
    }
    else {
      print("Got bills");
      print(id);
      //print(response);
      List<Bill> allBillsTemp = getBillsFromJson(response);
      if (allBillsTemp.length == 0) {
        _showToast("No bills", true);
        yesData = -1;
      }
      setState(() {
        allBills = allBillsTemp;
      });

      for (Bill b in allBills)
      {
        print(b.name);
      }
    }

    return yesData;
  }

  @override
  void initState() {
    super.initState();
    gotData = getAllData();
    _dataSource = MeetingDataSource(getAppointments(allBills)!);
  }

    @override
    Widget build(BuildContext context) {
      void onTabTapped(index) {
        print(index);
        selectedIndex = index;
        Navigator.pushNamed(context, routes[index]);
      }


      void showPaid(CalendarTapDetails details, BuildContext context)
      {
        final Appointment apt = details.appointments![0];
        String? billName = apt.subject;
        DateTime date = apt.startTime;
        Color bColor = apt.color;
        String? dateString = DateFormat("MM-dd-yyyy").format(date);

        Appointment? newApt = apt;

        if (bColor == Colors.green)
        {
            newApt.color = Colors.red;
        }
        else if (bColor == Colors.red)
        {
            newApt.color = Colors.green;
        }

        showDialog(
            context: context,
            builder: (BuildContext context) {
              return Dialog(
                backgroundColor: const Color(0xFFFAFAFA),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20.0)),
                child: Container(
                  height: 150,
                  child: Padding(
                    padding: const EdgeInsets.only(left: 10.0, right: 10.0),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      // crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(height: 10.0,),
                        const Text('Bill', style: TextStyle(fontSize: 25,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF2D4B03)),),
                        Padding(
                          padding: EdgeInsets.symmetric(vertical: 5),
                          child: Text("${billName} on ${dateString}", style: TextStyle(fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF2D4B03)),),
                        ),
                        Container(
                          alignment: Alignment.center,
                          height: 40,
                          width: 320,
                          decoration: BoxDecoration(
                            color: const Color(0xFF020100),
                            border: Border.all(width: 2, color: const Color(
                                0xFF2D4B03)),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: TextButton(
                            style: ButtonStyle(
                              foregroundColor: MaterialStateProperty.all<Color>(
                                  Colors.black),
                            ),
                            onPressed: () async {
                              //  Add category
                              id = global.userId;
                              print(id);
                              // setState(() {
                              //   appointmentDetails.color = Colors.green;
                              // });
                              //
                              // if (details.targetElement == CalendarElement.calendarCell) {
                              //   SchedulerBinding.instance!.addPostFrameCallback((duration) {
                              //
                              //   });
                              // }

                              setState(() {
                                appointmentDetails?.remove(apt);
                                appointmentDetails?.add(apt);
                              });

                              _dataSource = MeetingDataSource(appointmentDetails!);

                              Navigator.pop(context, true);
                            },
                            child: const Text(
                              'Paid',
                              style: TextStyle(fontSize: 20,
                                  color: Color(0xFFE3E9E7),
                                  fontWeight: FontWeight.bold),
                            ),
                          ),
                        ),
                        const SizedBox(height: 10.0,),
                      ],
                    ),
                  ),
                ),
              );
            });
      }



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
            child: FutureBuilder<int?>(
              future: gotData,
              builder: (context, snapshot) {
                if (snapshot.hasData && snapshot.data != -1) {
                  print("Snapshot Calendar");
                  print(snapshot.data);

                  return  Container(
                    width: MediaQuery.of(context).size.width,
                    decoration: BoxDecoration(
                        color: Color(0xddb3e5fc),
                        borderRadius: BorderRadius.circular(8),
                        boxShadow: [ BoxShadow(
                            blurRadius: 8,
                            // offset: Offset(0, 15),
                            color: Color(0xffe3e9e7).withOpacity(.5),
                            spreadRadius: -9)]
                    ),
                    child: Column(
                      // crossAxisAlignment: CrossAxisAlignment.start,
                      // mainAxisAlignment: MainAxisAlignment.start,
                      children: <Widget>[
                        Padding(
                          padding: EdgeInsets.only(top: 10.0, left: 15.0, right: 15.0),
                          child:  Column(
                            children: <Widget>[
                              const Align(
                                alignment: Alignment.centerLeft,
                                child: Text('Calendar', style: TextStyle(fontSize: 30,  fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                              ),
                              const SizedBox(height: 10.0,),
                              SfCalendar(
                                view: CalendarView.month,
                                // controller: _calendarController,
                                dataSource: MeetingDataSource(getAppointments(allBills)),
                                // monthViewSettings: MonthViewSettings(showAgenda: true, agendaItemHeight: 35.0),
                                onTap: (details) {
                                  return showPaid(details, context);
                                },
                              )
                            ],
                          ),
                        ),
                      ],
                    ),
                  );

                }
                else if (snapshot.hasError) {

                  return Container(
                    width: MediaQuery.of(context).size.width,
                    decoration: BoxDecoration(
                        color: Color(0xddb3e5fc),
                        borderRadius: BorderRadius.circular(8),
                        boxShadow: [ BoxShadow(
                            blurRadius: 8,
                            // offset: Offset(0, 15),
                            color: Color(0xffe3e9e7).withOpacity(.5),
                            spreadRadius: -9)]
                    ),
                    child: Column(
                      // crossAxisAlignment: CrossAxisAlignment.start,
                      // mainAxisAlignment: MainAxisAlignment.start,
                      children: <Widget>[
                        Padding(
                          padding: EdgeInsets.only(top: 10.0, left: 15.0, right: 15.0),
                          child:  Column(
                            children: <Widget>[
                              const Align(
                                alignment: Alignment.centerLeft,
                                child: Text('Calendar', style: TextStyle(fontSize: 30,  fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                              ),
                              const SizedBox(height: 10.0,),
                              SfCalendar(
                                view: CalendarView.month,
                              )
                            ],
                          ),
                        ),
                      ],
                    ),
                  );
                }
                else {
                  return const Center(child: CircularProgressIndicator());
                }
              },
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
                  icon: Icon(Icons.addchart, size: 35.0), label: 'Display'),
              BottomNavigationBarItem(
                  icon: Icon(Icons.add_circle_outline, size: 35.0),
                  label: 'Add'),
              BottomNavigationBarItem(
                  icon: Icon(Icons.calendar_month, size: 35.0),
                  label: 'Calendar'),
              BottomNavigationBarItem(
                  icon: Icon(Icons.account_circle, size: 35.0),
                  label: 'Account'),
            ],
          ),
        ),
      );
    }
}

List<Appointment> getAppointments(List<Bill> bills){
  List<Appointment> meetings = <Appointment>[];

  for (Bill b in bills)
  {
    final DateTime start = DateFormat("MM-dd-yyyy").parse(b.startDate);
    final DateTime end = DateFormat("MM-dd-yyyy").parse(b.endDate);
    print(b.name);

    Period diffP = LocalDate.dateTime(end).periodSince(LocalDate.dateTime(start));
    var diff = diffP.months;
    print("diff");
    print(diff);

    DateTime addDate = start;
    int counter = 0;

    while (counter <= diff)
    {
      print(addDate.toString());

      Color mycolor = Colors.red;
      print(b.isPaid);
      // if (b.isPaid!.contains(DateFormat("MM-dd-yyyy").format(addDate)))
      // {
      //   mycolor = Colors.green;
      // }

      meetings.add(Appointment(
        startTime: addDate,
        endTime: addDate,
        subject: b.name,
        color: mycolor,
        isAllDay: true,)
      );
      counter += 1;
      addDate = DateTime(addDate.year, addDate.month + 1, addDate.day);
    }

  }

  appointmentDetails = meetings;
  return meetings;
}


class MeetingDataSource extends CalendarDataSource{
  MeetingDataSource(List<Appointment> source)
  {
    appointments = source;
  }
}