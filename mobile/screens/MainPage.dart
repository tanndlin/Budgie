import 'dart:math';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

import 'package:mobile/global.dart' as global;
import 'package:percent_indicator/linear_percent_indicator.dart';
import '../base_client.dart';
import '../models/bill.dart';
import '../models/budget.dart';
import '../models/myCategory.dart';
import '../models/myExtra.dart';

String id = global.userId;

class MainPage extends StatefulWidget{

  const MainPage({super.key});
  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  late Future<String> gotData;

  int budIndex = 0;
  int extIndex = 0;
  int billIndex = 0;

  int selectedIndex = 0;
  List<String> routes = ['/MainPage', '/DisplayPage', '/AddPage', '/CalendarView', '/AccountManager'];

  List<Budget> getAllBudgets = <Budget>[];
  List<MyExtra> getAllExtras = <MyExtra>[];
  List<Bill> getAllBills = <Bill>[];

  List<MyCategory> getAllCategories = <MyCategory>[];
  MyCategory? categoryValue;

  List<Widget> containers = <Widget>[];

  _showToast(msg, error) => Fluttertoast.showToast(
    msg: msg, fontSize: 18, gravity: ToastGravity.BOTTOM, backgroundColor: error ? Color(0xFFFF0000).withOpacity(.8) :  Colors.green.withOpacity(.9), textColor: Colors.white,);

  Future<String> getData()
  async {
    id = global.userId;
    String ret = "";
    // getAllBudgets = <Budget>[];
    // getAllCategories = <MyCategory>[];

    var response = await BaseClient().getCategories(id).catchError((err) {print("Fail");});
    if (response == null) {
      _showToast("Could not get", true);
      print("response null");
    }
    else {
      print("Got Categories");
      print(id);
      print(response);
      List<MyCategory> allCategories = getCategoriesFromJson(response);
      for (MyCategory c in allCategories) {
        print(c.name);
      }

      if (allCategories.length == 0)
      {
        _showToast("No Categories", true);
      }


      setState(() {
        getAllCategories = allCategories;
      });

    }

    response = await BaseClient().getBudgets(id).catchError((err) {print("Fail");});
    if (response == null) {
      _showToast("Could not get", true);
      print("response null");
    }
    else {
      print("Got budgets");
      print(id);
      print(response);
      List<Budget> allBudgets = getBudgetsFromJson(response);
      for (Budget b in allBudgets) {
        print(b.name);
      }

      if (allBudgets.length == 0)
      {
        _showToast("No budgets", true);
        ret += "0";
      }
      else
      {
        ret += "1";
      }

      setState(() {
        getAllBudgets = allBudgets;
        // budIndex = Random().nextInt(getAllBudgets.length);
      });
      print(getAllBudgets.length);
    }

    response = await BaseClient().getBills(id).catchError((err) {print("Fail");});
    if (response == null) {
      _showToast("Could not get", true);
      print("response null");
    }
    else {
      print("Got Bills");
      print(id);
      print(response);
      List<Bill> allBills = getBillsFromJson(response);

      if (allBills.length == 0)
      {
        _showToast("No Bills", true);
        ret += "0";
      }
      else
      {
        ret += "1";
      }

      setState(() {
        getAllBills = allBills;
        // billIndex = Random().nextInt(getAllBills.length);
      });

      for (Bill e in getAllBills)
      {
        print(e.name);
      }
    }

    response = await BaseClient().getExtras(id).catchError((err) {print("Fail");});
    if (response == null) {
      _showToast("Could not get", true);
      print("response null");
    }
    else {
      print("Got Extras");
      print(id);
      print(response);
      List<MyExtra> allExtras = getExtrasFromJson(response);

      if (allExtras.length == 0)
      {
        _showToast("No Extras", true);
        ret += "0";
      }
      else
      {
        ret += "1";
      }

      setState(() {
        getAllExtras = allExtras;
        // extIndex = Random().nextInt(getAllExtras.length);
      });

      for (MyExtra e in getAllExtras)
      {
        print(e.name);
      }
      print(getAllExtras.length);
    }

    return ret;
  }


  @override
  void initState() {
    super.initState();

    gotData = getData();
  }

  @override
  Widget build(BuildContext context) {
    // List<Widget> widgetOptions = <Widget>[
    //   MainPageNav();
    //
    // ];

    void _goToDisplay(){
      Navigator.pushNamed(context, '/DisplayPage');
    }

    void onTabTapped(index){
      print(index);
      Navigator.pushNamed(context, routes[index]);
    }

    addBudgetContainer(int index) {
      if (index != 0)
      {
        budIndex = Random().nextInt(getAllBudgets.length);
        containers.add(
          Container(
            width: MediaQuery.of(context).size.width,
            height: 250,
            decoration: BoxDecoration(
                color: Color(0xddb3e5fc),
                borderRadius: BorderRadius.circular(8),
                boxShadow: [ BoxShadow(
                    blurRadius: 8,
                    offset: Offset(0, 15),
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
                        child: Text('Welcome!', style: TextStyle(fontSize: 20,  fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Your Budgets', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03), fontWeight: FontWeight.bold, decoration: TextDecoration.underline),),
                          TextButton(
                            onPressed: () {
                              // display budgets
                              _goToDisplay();
                            },
                            child: Text('See all', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03), decoration: TextDecoration.underline),),
                          ),
                        ],
                      ),
                      Container(
                        padding:  EdgeInsets.only(top: 2.0, left: 10.0, right: 10.0, bottom: 5.0),
                        width: MediaQuery.of(context).size.width,
                        height: 150,
                        decoration: BoxDecoration(
                            color: Color(0xddb3e5fc),
                            borderRadius: BorderRadius.circular(8),
                            boxShadow: [ BoxShadow(
                                blurRadius: 8,
                                offset: Offset(0, 15),
                                color: Color(0xffe3e9e7).withOpacity(.5),
                                spreadRadius: -9)]
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: <Widget>[
                            //  Text
                            Text(
                              "${getAllBudgets[budIndex].name}", style: TextStyle(fontSize: 18, color: Colors.blueAccent.shade700, fontWeight: FontWeight.bold, decoration: TextDecoration.underline),
                            ),
                            Text("Category: ${findCategory(getAllCategories, getAllBudgets[budIndex].categoryId)}", style: TextStyle(fontSize: 15, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),),
                            Text("Start Date: ${getAllBudgets[budIndex].justDate()}", style: TextStyle(fontSize: 15, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),),
                            Stack(
                              alignment: Alignment.center,
                              children: <Widget>[
                                LinearPercentIndicator(
                                  lineHeight: 20.0,
                                  percent: (getAllBudgets[budIndex].actualPrice/getAllBudgets[budIndex].expectedPrice),
                                  progressColor: (getAllBudgets[budIndex].actualPrice/getAllBudgets[budIndex].expectedPrice) <= 0.5 ? Colors.green.shade400 : Colors.red.shade500,
                                  backgroundColor: Colors.white70,
                                ),
                                Text("${(getAllBudgets[budIndex].actualPrice/getAllBudgets[budIndex].expectedPrice)*100}%", textAlign: TextAlign.center, style: TextStyle(fontSize: 15, color: Color(0xFF000000), fontWeight: FontWeight.bold),),
                              ],
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Text("${(getAllBudgets[budIndex].actualPrice)} of ${(getAllBudgets[budIndex].expectedPrice)}", style: TextStyle(fontSize: 15, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),),
                              ],
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
        );
      }
      else
      {
        containers.add(
          Container(
            width: MediaQuery.of(context).size.width,
            height: 250,
            decoration: BoxDecoration(
                color: Color(0xddb3e5fc),
                borderRadius: BorderRadius.circular(8),
                boxShadow: [ BoxShadow(
                    blurRadius: 8,
                    offset: Offset(0, 15),
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
                        child: Text('Welcome!', style: TextStyle(fontSize: 20,  fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Your Budgets', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03)),),
                          TextButton(
                            onPressed: () {
                              // display budgets
                              _goToDisplay();
                            },
                            child: Text('See all', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03), decoration: TextDecoration.underline),),
                          ),
                        ],
                      ),
                      Text(
                        "No budgets", style: TextStyle(fontSize: 18, color: Colors.blueAccent.shade700, fontWeight: FontWeight.bold, decoration: TextDecoration.underline),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      }
    }

    addBillContainer(int index)
    {
      if (index != 0)
      {
        billIndex = Random().nextInt(getAllBills.length);
        containers.add(
            Container(
              width: MediaQuery.of(context).size.width,
              height: 250,
              decoration: BoxDecoration(
                  color: Color(0xddb3e5fc),
                  borderRadius: BorderRadius.circular(8),
                  boxShadow: [ BoxShadow(
                      blurRadius: 8,
                      offset: Offset(0, 15),
                      color: Color(0xffe3e9e7).withOpacity(.5),
                      spreadRadius: -9)]
              ),
              child: Column(
                // crossAxisAlignment: CrossAxisAlignment.start,
                // mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                  Padding(
                    padding: EdgeInsets.only(top: 10.0, left: 15.0, right: 15.0, bottom: 10.0),
                    child:  Column(
                      children: <Widget>[

                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Your Bills', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03), fontWeight: FontWeight.bold, decoration: TextDecoration.underline),),
                            TextButton(
                              onPressed: () {
                                // display bills
                                _goToDisplay();
                              },
                              child: Text('See all', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03), decoration: TextDecoration.underline),),
                            ),
                          ],
                        ),
                        Container(
                          padding:  EdgeInsets.only(top: 2.0, left: 10.0, right: 10.0, bottom: 5.0),
                          width: MediaQuery.of(context).size.width,
                          height: 180,
                          decoration: BoxDecoration(
                              color: Color(0xddb3e5fc),
                              borderRadius: BorderRadius.circular(8),
                              boxShadow: [ BoxShadow(
                                  blurRadius: 8,
                                  offset: Offset(0, 15),
                                  color: Color(0xffe3e9e7).withOpacity(.5),
                                  spreadRadius: -9)]
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.spaceAround,
                            children: <Widget>[
                              //  Text
                              Text(
                                "${getAllBills[billIndex].name}", style: TextStyle(fontSize: 18, color: Colors.blueAccent.shade700, fontWeight: FontWeight.bold, decoration: TextDecoration.underline),
                              ),
                              Text("Price: \$${getAllBills[billIndex].price}", style: TextStyle(fontSize: 15, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),),
                              Text("Category: ${findCategory(getAllCategories, getAllBills[billIndex].categoryId)}", style: TextStyle(fontSize: 15, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),),
                              Text("Start Date: ${getAllBills[billIndex].justStartDate()}", style: TextStyle(fontSize: 15, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),),
                              Text("End Date: ${getAllBills[billIndex].justEndDate()}", style: TextStyle(fontSize: 15, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
        );
      }
      else
      {
        containers.add(
          Container(
            width: MediaQuery.of(context).size.width,
            height: 200,
            decoration: BoxDecoration(
                color: Color(0xddb3e5fc),
                borderRadius: BorderRadius.circular(8),
                boxShadow: [ BoxShadow(
                    blurRadius: 8,
                    offset: Offset(0, 15),
                    color: Color(0xffe3e9e7).withOpacity(.5),
                    spreadRadius: -9)]
            ),
            child: Column(
              // crossAxisAlignment: CrossAxisAlignment.start,
              // mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Padding(
                  padding: EdgeInsets.only(top: 10.0, left: 15.0, right: 15.0, bottom: 10.0),
                  child:  Column(
                    children: <Widget>[
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Your Bills', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03)),),
                          TextButton(
                            onPressed: () {
                              // display bills
                              _goToDisplay();
                            },
                            child: Text('See all', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03), decoration: TextDecoration.underline),),
                          ),
                        ],
                      ),
                      Text(
                        "No bills", style: TextStyle(fontSize: 18, color: Colors.blueAccent.shade700, fontWeight: FontWeight.bold, decoration: TextDecoration.underline),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      }
    }

    addExtraContainer(int index) {
      if (index != 0)
      {
        extIndex = Random().nextInt(getAllExtras.length);
        containers.add(
          Container(
            width: MediaQuery.of(context).size.width,
            height: 230,
            decoration: BoxDecoration(
                color: Color(0xddb3e5fc),
                borderRadius: BorderRadius.circular(8),
                boxShadow: [ BoxShadow(
                    blurRadius: 8,
                    offset: Offset(0, 15),
                    color: Color(0xffe3e9e7).withOpacity(.5),
                    spreadRadius: -9)]
            ),
            child: Column(
              // crossAxisAlignment: CrossAxisAlignment.start,
              // mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Padding(
                  padding: EdgeInsets.only(top: 10.0, left: 15.0, right: 15.0, bottom: 10.0),
                  child:  Column(
                    children: <Widget>[
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Your Extras', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03), fontWeight: FontWeight.bold, decoration: TextDecoration.underline),),
                          TextButton(
                            onPressed: () {
                              // display one-off
                              _goToDisplay();
                            },
                            child: Text('See all', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03), decoration: TextDecoration.underline),),
                          ),
                        ],
                      ),
                      Container(
                        padding:  EdgeInsets.only(top: 2.0, left: 10.0, right: 10.0, bottom: 5.0),
                        width: MediaQuery.of(context).size.width,
                        height: 150,
                        decoration: BoxDecoration(
                            color: Color(0xddb3e5fc),
                            borderRadius: BorderRadius.circular(8),
                            boxShadow: [ BoxShadow(
                                blurRadius: 8,
                                offset: Offset(0, 15),
                                color: Color(0xffe3e9e7).withOpacity(.5),
                                spreadRadius: -9)]
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: <Widget>[
                            //  Text
                            Text(
                              "${getAllExtras[extIndex].name}", style: TextStyle(fontSize: 18, color: Colors.blueAccent.shade700, fontWeight: FontWeight.bold, decoration: TextDecoration.underline),
                            ),
                            Text("Price: \$${getAllExtras[extIndex].price}", style: TextStyle(fontSize: 15, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),),
                            Text("Category: ${findCategory(getAllCategories, getAllExtras[extIndex].categoryId)}", style: TextStyle(fontSize: 15, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),),
                            Text("Date: ${getAllExtras[extIndex].justDate()}", style: TextStyle(fontSize: 15, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      }
      else
      {
        containers.add(
          Container(
            width: MediaQuery.of(context).size.width,
            height: 180,
            decoration: BoxDecoration(
                color: Color(0xddb3e5fc),
                borderRadius: BorderRadius.circular(8),
                boxShadow: [ BoxShadow(
                    blurRadius: 8,
                    offset: Offset(0, 15),
                    color: Color(0xffe3e9e7).withOpacity(.5),
                    spreadRadius: -9)]
            ),
            child: Column(
              // crossAxisAlignment: CrossAxisAlignment.start,
              // mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Padding(
                  padding: EdgeInsets.only(top: 10.0, left: 15.0, right: 15.0, bottom: 10.0),
                  child:  Column(
                    children: <Widget>[

                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Your Extras', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03)),),
                          TextButton(
                            onPressed: () {
                              // display one-off
                              _goToDisplay();
                            },
                            child: Text('See all', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03), decoration: TextDecoration.underline),),
                          ),
                        ],
                      ),
                      Text(
                        "No extras", style: TextStyle(fontSize: 18, color: Colors.blueAccent.shade700, fontWeight: FontWeight.bold, decoration: TextDecoration.underline),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      }
    }

    Widget getWidgetsNoData()
    {
      return Column(
        children: [
          const SizedBox(height: 10.0,),
          // WHOLE PAGE
          Padding(
              padding: EdgeInsets.only(left: 5.0, right: 5.0),
              child: Column(
                children: <Widget>[
                  // BUDGET WIDGET
                  Container(
                    width: MediaQuery.of(context).size.width,
                    height: 250,
                    decoration: BoxDecoration(
                        color: Color(0xddb3e5fc),
                        borderRadius: BorderRadius.circular(8),
                        boxShadow: [ BoxShadow(
                            blurRadius: 8,
                            offset: Offset(0, 15),
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
                                child: Text('Welcome!', style: TextStyle(fontSize: 20,  fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text('Your Budgets', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03)),),
                                  TextButton(
                                    onPressed: () {
                                      // display budgets
                                      _goToDisplay();
                                    },
                                    child: Text('See all', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03), decoration: TextDecoration.underline),),
                                  ),
                                ],
                              ),
                              Text(
                                "No budgets", style: TextStyle(fontSize: 18, color: Colors.blueAccent.shade700, fontWeight: FontWeight.bold, decoration: TextDecoration.underline),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 15.0,),
                  // BILL WIDGET
                  Container(
                    width: MediaQuery.of(context).size.width,
                    height: 200,
                    decoration: BoxDecoration(
                        color: Color(0xddb3e5fc),
                        borderRadius: BorderRadius.circular(8),
                        boxShadow: [ BoxShadow(
                            blurRadius: 8,
                            offset: Offset(0, 15),
                            color: Color(0xffe3e9e7).withOpacity(.5),
                            spreadRadius: -9)]
                    ),
                    child: Column(
                      // crossAxisAlignment: CrossAxisAlignment.start,
                      // mainAxisAlignment: MainAxisAlignment.start,
                      children: <Widget>[
                        Padding(
                          padding: EdgeInsets.only(top: 10.0, left: 15.0, right: 15.0, bottom: 10.0),
                          child:  Column(
                            children: <Widget>[
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text('Your Bills', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03)),),
                                  TextButton(
                                    onPressed: () {
                                      // display bills
                                      _goToDisplay();
                                    },
                                    child: Text('See all', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03), decoration: TextDecoration.underline),),
                                  ),
                                ],
                              ),
                              Text(
                                "No bills", style: TextStyle(fontSize: 18, color: Colors.blueAccent.shade700, fontWeight: FontWeight.bold, decoration: TextDecoration.underline),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 15.0,),
                  // BILL WIDGET
                  Container(
                    width: MediaQuery.of(context).size.width,
                    height: 180,
                    decoration: BoxDecoration(
                        color: Color(0xddb3e5fc),
                        borderRadius: BorderRadius.circular(8),
                        boxShadow: [ BoxShadow(
                            blurRadius: 8,
                            offset: Offset(0, 15),
                            color: Color(0xffe3e9e7).withOpacity(.5),
                            spreadRadius: -9)]
                    ),
                    child: Column(
                      // crossAxisAlignment: CrossAxisAlignment.start,
                      // mainAxisAlignment: MainAxisAlignment.start,
                      children: <Widget>[
                        Padding(
                          padding: EdgeInsets.only(top: 10.0, left: 15.0, right: 15.0, bottom: 10.0),
                          child:  Column(
                            children: <Widget>[

                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text('Your Extras', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03)),),
                                  TextButton(
                                    onPressed: () {
                                      // display one-off
                                      _goToDisplay();
                                    },
                                    child: Text('See all', style: TextStyle(fontSize: 20,  color: Color(0xFF2D4B03), decoration: TextDecoration.underline),),
                                  ),
                                ],
                              ),
                              Text(
                                "No extras", style: TextStyle(fontSize: 18, color: Colors.blueAccent.shade700, fontWeight: FontWeight.bold, decoration: TextDecoration.underline),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              )
          ),
        ],
      );
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
      child: Scaffold (
        // Header and background
        backgroundColor: Colors.transparent,
        appBar: AppBar(
          centerTitle: false,
          title: const Text(
            'Budgie',
            style: TextStyle(fontSize: 35, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),
          ),
          actions: <Widget>[
            Padding(
              padding: EdgeInsets.only(right: 20.0, bottom: 6.0),
            child: GestureDetector(
              onTap: () {
                Navigator.pushNamed(context, '/MainPage');
              },
              // child: Icon(Icons.logout, color: Color(0xFF2D4B03), size: 35.0,),
              child: Image.asset('assets/images/budgie.png', scale: 0.1,),
            ),)
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
          child: FutureBuilder<String>(
            future: gotData,
            builder: (context, snapshot) {
              if (snapshot.hasData)
              {
                print("Snapshot");
                print(snapshot.data);
                String? str = snapshot.data;
                int len = 0;

                if (str != null)
                {
                    var data = str.split('');
                    addBudgetContainer(int.parse(data[0]));
                    addBillContainer(int.parse(data[1]));
                    addExtraContainer(int.parse(data[2]));

                    len = str.length;
                }

                return ListView.separated(
                  physics: NeverScrollableScrollPhysics(),
                  scrollDirection: Axis.vertical,
                  shrinkWrap: true,
                  itemCount: len,
                  padding: EdgeInsets.symmetric(horizontal: 10.0, vertical: 10.0),
                  itemBuilder: (context, index) {
                    return containers[index];

                  },
                  separatorBuilder: (context, index) => const Divider(),
                );

              }
              else if (snapshot.hasError)
              {
                return getWidgetsNoData();
              }
              else
              {
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
            BottomNavigationBarItem(icon: Icon(Icons.home, size: 35.0,), label: 'Home'),
            BottomNavigationBarItem(icon: Icon(Icons.addchart, size: 35.0), label: 'Display'),
            BottomNavigationBarItem(icon: Icon(Icons.add_circle_outline, size: 35.0), label: 'Add'),
            BottomNavigationBarItem(icon: Icon(Icons.calendar_month, size: 35.0), label: 'Calendar'),
            BottomNavigationBarItem(icon: Icon(Icons.account_circle, size: 35.0), label: 'Account'),
          ],
        ),
      )
    );
  }

}