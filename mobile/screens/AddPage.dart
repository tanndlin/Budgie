import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:intl/intl.dart';
import 'package:mobile/screens/LoginPage.dart';
import 'package:time_machine/time_machine.dart';

import '../base_client.dart';
import '../models/bill.dart';
import '../models/budget.dart';
import '../models/myCategory.dart';

import 'package:mobile/global.dart' as global;

import '../models/myExtra.dart';

String id = global.userId;

class AddPage extends StatefulWidget {
  const AddPage({super.key});

  @override
  State<AddPage> createState() => _AddPageState();
}

class _AddPageState extends State<AddPage> {
  // budget fields
  // FirebaseAuth auth = FirebaseAuth.instance;

  final budgetName = TextEditingController();
  final budgetExpected = TextEditingController();
  final budgetActual = TextEditingController();
  final budgetStart = TextEditingController();
  // DateTime _budgetStartDate = DateTime.now();

  final billName = TextEditingController();
  final billPrice = TextEditingController();
  final _billDateStart = TextEditingController();
  final _billDateEnd = TextEditingController();

  final extraName = TextEditingController();
  final extraPrice = TextEditingController();
  final extraDate = TextEditingController();

  final categoryAdd = TextEditingController();

  void clearFields() {
    budgetName.clear();
    budgetExpected.clear();
    budgetActual.clear();
    budgetStart.clear();

    billName.clear();
    billPrice.clear();
    _billDateStart.clear();
    _billDateEnd.clear();

    extraName.clear();
    extraPrice.clear();
    extraDate.clear();

    categoryAdd.clear();
  }

  _showToast(msg, error) => Fluttertoast.showToast(
    msg: msg, fontSize: 18, gravity: ToastGravity.BOTTOM, backgroundColor: error ? Color(0xFFFF0000).withOpacity(.8) :  Colors.green.withOpacity(.9), textColor: Colors.white,);


  int selectedIndex = 2;
  List<String> routes = ['/MainPage', '/DisplayPage', '/AddPage', '/CalendarView', '/AccountManager'];

  //0 - budgets, 1 - bills, 2 - extras, 3 - clear
  List<bool> isSelected = [false, false, false, false];

  List<MyCategory> getAllCategories = <MyCategory>[];
  MyCategory? categoryValue;

  Future<void> getAllCat()
  async {
    id = global.userId;
    getAllCategories = <MyCategory>[];

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
      // var addVal = MyCategory(name: "Add New");
      // allCategories.add(addVal);
      setState(() {
        getAllCategories = allCategories;
      });

    }
  }

  @override
  void initState() {
    super.initState();
    getAllCat();
  }

  @override
  Widget build(BuildContext context) {
    // List<Widget> widgetOptions = <Widget>[
    //   MainPageNav();
    //
    // ];

    void onTabTapped(index) {
      print(index);
      selectedIndex = index;
      Navigator.pushNamed(context, routes[index]);
    }

    void showAddCategory(BuildContext context){
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return Dialog(
              backgroundColor: const Color(0xFFFAFAFA),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0)),
              child: Container(
                height: 200,
                child: Padding(
                  padding: const EdgeInsets.only(left: 10.0, right: 10.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    // crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Add Category', style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                      const SizedBox( height: 10.0,),
                      TextField(
                        controller: categoryAdd,
                        decoration: InputDecoration(
                            enabledBorder: OutlineInputBorder(
                              borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                              borderRadius: BorderRadius.circular(10.0),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                              borderRadius: BorderRadius.circular(10.0),
                            ),
                            prefixIcon: const Icon(Icons.list_outlined),
                            labelText: 'Name',
                            hintText: 'Name'),
                      ),
                      const SizedBox( height: 10.0,),
                      Container(
                        alignment: Alignment.center,
                        height: 40,
                        width: 320,
                        decoration: BoxDecoration(
                          color: const Color(0xFF020100), border: Border.all(width: 2, color: const Color(0xFF2D4B03)), borderRadius: BorderRadius.circular(10),
                        ),
                        child: TextButton(
                          style: ButtonStyle(
                            foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                          ),
                          onPressed: () async {
                          //  Add category
                            id = global.userId;
                            var cat = MyCategory(
                                userId: id,
                                name: categoryAdd.text,
                            );
                            print("Json");
                            print(myCategoryToJson(cat));
                            var response = await BaseClient().postCategory(cat).catchError((err) {print("Fail");});
                            if (response == null) {
                              _showToast("Could not get", true);
                              print("response null");
                            }
                            else {
                              print("Add Category");
                              print(id);
                              print(response);
                            }

                            getAllCat();
                            Navigator.pop(context, true);
                          },
                          child: const Text(
                            'Add',
                            style: TextStyle(fontSize: 20, color: Color(0xFFE3E9E7), fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
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
        child: Scaffold (
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
              child: Column(
                children: [
                  const SizedBox(height: 10.0,),
                  // WHOLE PAGE
                  Padding(
                      padding: EdgeInsets.only(left: 5.0, right: 5.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          // BUDGET WIDGET
                          Container(
                            width: MediaQuery.of(context).size.width,
                            // height:  MediaQuery.of(context).size.height,
                            decoration: BoxDecoration(
                                color: Color(0x55b3e5fc),

                            ),
                            child: Column(
                              // crossAxisAlignment: CrossAxisAlignment.start,
                              // mainAxisAlignment: MainAxisAlignment.center,
                              children: <Widget>[
                                Padding(
                                  padding: EdgeInsets.only(top: 10.0, left: 15.0, right: 15.0, bottom: 10.0),
                                  child:  Column(
                                    children: <Widget>[
                                      const Align(
                                        alignment: Alignment.centerLeft,
                                        child: Text('Add', style: TextStyle(fontSize: 30,  fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                                      ),
                                      const SizedBox(height: 10.0,),
                                      ToggleButtons(
                                        isSelected: isSelected,
                                        // selectedColor: Colors.white70,
                                        fillColor: Colors.white70,
                                        borderRadius: BorderRadius.circular(8),
                                        // renderBorder: false,
                                        borderColor: Colors.black54,
                                        selectedBorderColor: Colors.black,
                                        splashColor: Colors.transparent,
                                        children: const <Widget>[
                                          Padding(
                                              padding: EdgeInsets.symmetric(horizontal: 8),
                                              child: Text('Budget', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                                          ),
                                          Padding(
                                            padding: EdgeInsets.symmetric(horizontal: 8),
                                            child: Text('Bill', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                                          ),
                                          Padding(
                                            padding: EdgeInsets.symmetric(horizontal: 8),
                                            child: Text('Extras', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                                          ),
                                          Padding(
                                            padding: EdgeInsets.symmetric(horizontal: 8),
                                            child: Text('Category', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                                          ),
                                        ],
                                        onPressed: (int newIndex) {
                                          setState(() {
                                            budgetStart.text = DateFormat("MM-dd-yyyy").format(DateTime.now());
                                            _billDateStart.text = DateFormat("MM-dd-yyyy").format(DateTime.now());
                                            _billDateEnd.text = DateFormat("MM-dd-yyyy").format(DateTime.now());
                                            extraDate.text = DateFormat("MM-dd-yyyy").format(DateTime.now());
                                            // getAllCat();
                                            for (int index = 0; index < isSelected.length; index++)
                                            {
                                              print(newIndex);
                                              if (index == newIndex) {
                                                isSelected[index] = true;
                                              }
                                              else{
                                                isSelected[index] = false;
                                              }
                                              print(isSelected);
                                            }
                                          });

                                        },
                                      ),
                                      // BUDGET FIELDS
                                      Visibility(
                                          // name, category, spent, total
                                          visible: isSelected[0],
                                          child: Padding(
                                            padding: EdgeInsets.symmetric(horizontal: 15),
                                            child: Column(
                                              children: [
                                              //  Budget name
                                                SizedBox(height: 20.0),
                                                Padding(
                                                  //padding: const EdgeInsets.only(left:15.0,right: 15.0,top:0,bottom: 0),
                                                  padding: const EdgeInsets.symmetric(vertical: 8),
                                                  child: TextField(
                                                    controller: budgetName,
                                                    decoration: InputDecoration(
                                                        contentPadding: EdgeInsets.symmetric(vertical: 0),
                                                        focusColor: const Color(0xFF2D4B03),
                                                        enabledBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        focusedBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        prefixIcon: const Icon(Icons.list_alt_rounded),
                                                        labelText: 'Budget Name',
                                                        hintText: 'Name'),
                                                  ),
                                                ),
                                                Padding(
                                                  // padding: const EdgeInsets.only(
                                                  //     left: 15.0, right: 15.0, top: 15, bottom: 10.0),
                                                  padding: EdgeInsets.symmetric(vertical: 8),
                                                  child: TextField(
                                                    controller: budgetActual,
                                                    decoration: InputDecoration(
                                                        contentPadding: EdgeInsets.symmetric(vertical: 0),
                                                        enabledBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        focusedBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        prefixIcon: Icon(Icons.currency_exchange_outlined) ,
                                                        labelText: 'Spent Amount',
                                                        hintText: 'Spent'),
                                                  ),
                                                ),
                                                Padding(
                                                  // padding: const EdgeInsets.only(
                                                  //     left: 15.0, right: 15.0, top: 15, bottom: 10.0),
                                                  padding: EdgeInsets.symmetric(vertical: 8),
                                                  child: TextField(
                                                    controller: budgetExpected,
                                                    decoration: InputDecoration(
                                                        contentPadding: EdgeInsets.symmetric(vertical: 0),
                                                        enabledBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        focusedBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        prefixIcon: Icon(Icons.currency_exchange_outlined) ,
                                                        labelText: 'Total Amount',
                                                        hintText: 'Total'),
                                                  ),
                                                ),
                                                Padding(
                                                  padding: EdgeInsets.symmetric(vertical: 8),
                                                  child: Row(
                                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                    children: <Widget>[
                                                      Container(
                                                        width: 230.0,
                                                        height: 52,
                                                        child: DropdownButtonFormField(
                                                          // alignment: Alignment.center,
                                                          decoration: InputDecoration(
                                                            contentPadding: EdgeInsets.symmetric(horizontal: 4),
                                                            focusColor: const Color(0xFF2D4B03),
                                                            enabledBorder: OutlineInputBorder(
                                                              borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                              borderRadius: BorderRadius.circular(50.0),
                                                            ),
                                                            focusedBorder: OutlineInputBorder(
                                                              borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                              borderRadius: BorderRadius.circular(50.0),
                                                            ),
                                                            prefixIcon: Icon(Icons.list),
                                                          ),
                                                          isDense: false,
                                                          // isExpanded: true,
                                                          iconSize: 24,
                                                          hint: Text('Choose Category'),
                                                          borderRadius: BorderRadius.circular(8),
                                                          dropdownColor: Color(0xFFE3E9E7),
                                                          style: TextStyle(color: Color(0xFF000000), fontSize: 16),
                                                          items: getAllCategories.map((item) {
                                                            return DropdownMenuItem<MyCategory>(
                                                              child: Text(item.name),
                                                              value: item,
                                                            );
                                                          }).toList(),
                                                          onChanged: (newVal) {
                                                            if (newVal != null)
                                                            {
                                                              setState(() {
                                                                categoryValue = newVal as MyCategory?;
                                                              });
                                                            }
                                                            print(categoryValue?.name);
                                                          },
                                                          value: categoryValue,
                                                        ),
                                                      ),
                                                      IconButton(
                                                        style: ButtonStyle(
                                                          foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                                                        ),
                                                        onPressed: ()  {
                                                          showAddCategory(context);
                                                        },
                                                        icon: Icon(Icons.add_circle),
                                                        iconSize: 40,
                                                        constraints: BoxConstraints(),
                                                        padding: EdgeInsets.zero,
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                                Padding(
                                                  padding: EdgeInsets.symmetric(vertical: 8),
                                                  child: TextField(
                                                    controller: budgetStart,
                                                    decoration: InputDecoration(
                                                        contentPadding: EdgeInsets.symmetric(vertical: 0),
                                                        enabledBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        focusedBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        prefixIcon: Icon(Icons.calendar_month) ,
                                                        labelText: 'Start Date',
                                                        hintText: 'Start'),
                                                    readOnly: true,
                                                    onTap: () async {
                                                      DateTime? pickedDate = await showDatePicker(
                                                          context: context,
                                                          initialDate: DateFormat("MM-dd-yyyy").parse(budgetStart.text),
                                                          firstDate: DateTime(1900),
                                                          lastDate: DateTime(2222)
                                                      );
                                                      if (pickedDate != null)
                                                      {
                                                        String formatDate = DateFormat("MM-dd-yyyy").format(pickedDate);
                                                        setState(() {
                                                          budgetStart.text = formatDate;
                                                        });
                                                      }
                                                    },
                                                  ),
                                                ),
                                                const SizedBox(
                                                  height: 10.0,
                                                ),
                                                Container(
                                                  alignment: Alignment.center,
                                                  height: 50,
                                                  width: 180,
                                                  decoration: BoxDecoration(
                                                    color: const Color(0xFF020100), border: Border.all(width: 2, color: const Color(0xFF2D4B03)), borderRadius: BorderRadius.circular(20),
                                                  ),
                                                  child: TextButton(
                                                    style: ButtonStyle(
                                                      foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                                                    ),
                                                    onPressed: () async {
                                                      id = global.userId;
                                                      // ADD BUDGET
                                                      print(id);
                                                      if (budgetName.text == "" || budgetActual.text == "" || budgetExpected.text == "")
                                                      {
                                                          _showToast("Fill fields", true);
                                                      }
                                                      else
                                                      {
                                                        var budget = Budget(
                                                            userId: id,
                                                            name: budgetName.text,
                                                            actualPrice: num.parse(budgetActual.text),
                                                            expectedPrice: num.parse(budgetExpected.text),
                                                            categoryId: categoryValue?.id,
                                                            startDate: budgetStart.text,
                                                        );
                                                        print(budgetToJson(budget));
                                                        var response = await BaseClient().postBudget(budget).catchError((err) {print("Fail");});
                                                        if (response == null) {
                                                          _showToast("Could not add", true);
                                                          print("response null");
                                                        }

                                                        _showToast("Added", false);
                                                        print("success");
                                                      }

                                                      clearFields();
                                                      setState(() {
                                                        budgetStart.text =  DateFormat("MM-dd-yyyy").format(DateTime.now());
                                                      });

                                                    },
                                                    child: const Text(
                                                      'Add Budget',
                                                      style: TextStyle(fontSize: 23, color: Color(0xFFE3E9E7), fontWeight: FontWeight.bold),
                                                    ),
                                                  ),
                                                ),
                                              ],
                                            ),
                                          )
                                      ),
                                      // Bill visible
                                      Visibility(
                                        visible: isSelected[1],
                                          child: Padding(
                                            padding: EdgeInsets.symmetric(horizontal: 15),
                                            child: Column(
                                              children: [
                                                //  Budget name
                                                SizedBox(height: 20.0),
                                                Padding(
                                                  //padding: const EdgeInsets.only(left:15.0,right: 15.0,top:0,bottom: 0),
                                                  padding: const EdgeInsets.symmetric(vertical: 8),
                                                  child: TextField(
                                                    controller: billName,
                                                    decoration: InputDecoration(
                                                      contentPadding: EdgeInsets.symmetric(vertical: 0),
                                                        focusColor: const Color(0xFF2D4B03),
                                                        enabledBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        focusedBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        prefixIcon: const Icon(Icons.list_alt_rounded),
                                                        labelText: 'Bill Name',
                                                        hintText: 'Name'),
                                                  ),
                                                ),
                                                Padding(
                                                  // padding: const EdgeInsets.only(
                                                  //     left: 15.0, right: 15.0, top: 15, bottom: 10.0),
                                                  padding: EdgeInsets.symmetric(vertical: 8),
                                                  child: TextField(
                                                    controller: billPrice,
                                                    decoration: InputDecoration(
                                                        contentPadding: EdgeInsets.symmetric(vertical: 0),
                                                        enabledBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        focusedBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        prefixIcon: Icon(Icons.currency_exchange_outlined) ,
                                                        labelText: 'Price',
                                                        hintText: 'Price'),
                                                  ),
                                                ),
                                                Padding(
                                                  padding: EdgeInsets.symmetric(vertical: 8),
                                                  child: TextField(
                                                    controller: _billDateStart,
                                                    decoration: InputDecoration(
                                                        contentPadding: EdgeInsets.symmetric(vertical: 0),
                                                        enabledBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        focusedBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        prefixIcon: Icon(Icons.calendar_month) ,
                                                        labelText: 'Start Date',
                                                        hintText: 'Start'),
                                                    readOnly: true,
                                                    onTap: () async {
                                                      DateTime? pickedDate = await showDatePicker(
                                                          context: context,
                                                          initialDate: DateFormat("MM-dd-yyyy").parse(_billDateStart.text),
                                                          firstDate: DateTime(1900),
                                                          lastDate: DateTime(2222)
                                                      );
                                                      if (pickedDate != null)
                                                      {
                                                        String formatDate = DateFormat("MM-dd-yyyy").format(pickedDate);
                                                        setState(() {
                                                          _billDateStart.text = formatDate;
                                                        });
                                                      }
                                                    },
                                                  ),
                                                ),
                                                Padding(
                                                  padding: EdgeInsets.symmetric(vertical: 8),
                                                  child: TextField(
                                                    controller: _billDateEnd,
                                                    decoration: InputDecoration(
                                                        contentPadding: EdgeInsets.symmetric(vertical: 0),
                                                        enabledBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        focusedBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        prefixIcon: Icon(Icons.calendar_month) ,
                                                        labelText: 'End Date',
                                                        hintText: 'End'),
                                                    readOnly: true,
                                                    onTap: () async {
                                                      DateTime? pickedDate = await showDatePicker(
                                                          context: context,
                                                          initialDate: DateFormat("MM-dd-yyyy").parse(_billDateEnd.text),
                                                          firstDate: DateTime(1900),
                                                          lastDate: DateTime(2222)
                                                      );
                                                      if (pickedDate != null)
                                                      {
                                                        String formatDate = DateFormat("MM-dd-yyyy").format(pickedDate);
                                                        setState(() {
                                                          _billDateEnd.text = formatDate;
                                                        });
                                                      }
                                                    },
                                                  ),
                                                ),
                                                Padding(
                                                  padding: EdgeInsets.symmetric(vertical: 8),
                                                  child: Row(
                                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                    children: <Widget>[
                                                      Container(
                                                        width: 230.0,
                                                        height: 52,
                                                        child: DropdownButtonFormField(
                                                          // alignment: Alignment.center,
                                                          decoration: InputDecoration(
                                                            contentPadding: EdgeInsets.symmetric(horizontal: 4),
                                                            focusColor: const Color(0xFF2D4B03),
                                                            enabledBorder: OutlineInputBorder(
                                                              borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                              borderRadius: BorderRadius.circular(50.0),
                                                            ),
                                                            focusedBorder: OutlineInputBorder(
                                                              borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                              borderRadius: BorderRadius.circular(50.0),
                                                            ),
                                                            prefixIcon: Icon(Icons.list),
                                                          ),
                                                          isDense: false,
                                                          // isExpanded: true,
                                                          iconSize: 24,
                                                          hint: Text('Choose Category'),
                                                          borderRadius: BorderRadius.circular(8),
                                                          dropdownColor: Color(0xFFE3E9E7),
                                                          style: TextStyle(color: Color(0xFF000000), fontSize: 16),
                                                          items: getAllCategories.map((item) {
                                                            return DropdownMenuItem<MyCategory>(
                                                              child: Text(item.name),
                                                              value: item,
                                                            );
                                                          }).toList(),
                                                          onChanged: (newVal) {
                                                            if (newVal != null)
                                                            {
                                                              setState(() {
                                                                categoryValue = newVal as MyCategory?;
                                                              });
                                                            }
                                                            print(categoryValue?.name);
                                                          },
                                                          value: categoryValue,
                                                        ),
                                                      ),
                                                      IconButton(
                                                        style: ButtonStyle(
                                                          foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                                                        ),
                                                        onPressed: ()  {
                                                          showAddCategory(context);
                                                        },
                                                        icon: Icon(Icons.add_circle),
                                                        iconSize: 40,
                                                        constraints: BoxConstraints(),
                                                        padding: EdgeInsets.zero,
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                                const SizedBox(
                                                  height: 20.0,
                                                ),
                                                Container(
                                                  alignment: Alignment.center,
                                                  height: 50,
                                                  width: 180,
                                                  decoration: BoxDecoration(
                                                    color: const Color(0xFF020100), border: Border.all(width: 2, color: const Color(0xFF2D4B03)), borderRadius: BorderRadius.circular(20),
                                                  ),
                                                  child: TextButton(
                                                    style: ButtonStyle(
                                                      foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                                                    ),
                                                    onPressed: () async {
                                                      // ADD BUDGET
                                                      print(id);
                                                      List<DateTime> unPaidList = <DateTime>[];
                                                      DateTime start = DateFormat("MM-dd-yyyy").parse(_billDateStart.text);
                                                      DateTime end = DateFormat("MM-dd-yyyy").parse(_billDateEnd.text);
                                                      unPaidList.add(start);
                                                      Period diffP = LocalDate.dateTime(end).periodSince(LocalDate.dateTime(start));
                                                      var diff = diffP.months;
                                                      int counter = 0;

                                                      while (counter < diff)
                                                      {
                                                        counter += 1;
                                                        DateTime newDate = DateTime(start.year, start.month + counter, start.day);
                                                        unPaidList.add(newDate);
                                                      }

                                                      for (DateTime d in unPaidList)
                                                      {
                                                        print(d.toString());
                                                      }

                                                      if (billName.text == "" || billPrice.text == "")
                                                      {
                                                        _showToast("Fill fields", true);
                                                      }
                                                      else
                                                      {
                                                        var bill = Bill(
                                                          userId: id,
                                                          name: billName.text,
                                                          price: num.parse(billPrice.text),
                                                          startDate: _billDateStart.text,
                                                          endDate: _billDateEnd.text,
                                                          color: "#ffffff",
                                                          // unPaid: unPaidList,
                                                          categoryId: categoryValue?.id,
                                                        );
                                                        print(billToJson(bill));
                                                        var response = await BaseClient().postBill(bill).catchError((err) {print("Fail");});
                                                        if (response == null) {
                                                          _showToast("Could not add", true);
                                                          print("response null");
                                                        }

                                                        _showToast("Added", false);
                                                        print("success");
                                                      }

                                                      clearFields();
                                                      setState(() {
                                                        _billDateStart.text = DateFormat("MM-dd-yyyy").format(DateTime.now());
                                                        _billDateEnd.text =  DateFormat("MM-dd-yyyy").format(DateTime.now());
                                                      });

                                                    },
                                                    child: const Text(
                                                      'Add Bill',
                                                      style: TextStyle(fontSize: 23, color: Color(0xFFE3E9E7), fontWeight: FontWeight.bold),
                                                    ),
                                                  ),
                                                ),
                                              ],
                                            ),
                                          )
                                      ),
                                      // Budget visible
                                      Visibility(
                                        visible: isSelected[2],
                                          child: Padding(
                                            padding: EdgeInsets.symmetric(horizontal: 15),
                                            child: Column(
                                              children: [
                                                //  Budget name
                                                SizedBox(height: 20.0),
                                                Padding(
                                                  //padding: const EdgeInsets.only(left:15.0,right: 15.0,top:0,bottom: 0),
                                                  padding: const EdgeInsets.symmetric(vertical: 8),
                                                  child: TextField(
                                                    controller: extraName,
                                                    decoration: InputDecoration(
                                                        contentPadding: EdgeInsets.symmetric(vertical: 0),
                                                        focusColor: const Color(0xFF2D4B03),
                                                        enabledBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        focusedBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        prefixIcon: const Icon(Icons.list_alt_rounded),
                                                        labelText: 'Extra Name',
                                                        hintText: 'Name'),
                                                  ),
                                                ),
                                                Padding(
                                                  // padding: const EdgeInsets.only(
                                                  //     left: 15.0, right: 15.0, top: 15, bottom: 10.0),
                                                  padding: EdgeInsets.symmetric(vertical: 8),
                                                  child: TextField(
                                                    controller: extraPrice,
                                                    decoration: InputDecoration(
                                                        contentPadding: EdgeInsets.symmetric(vertical: 0),
                                                        enabledBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        focusedBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        prefixIcon: Icon(Icons.currency_exchange_outlined) ,
                                                        labelText: 'Price Amount',
                                                        hintText: 'Price'),
                                                  ),
                                                ),
                                                Padding(
                                                  padding: EdgeInsets.symmetric(vertical: 8),
                                                  child: TextField(
                                                    controller: extraDate,
                                                    decoration: InputDecoration(
                                                        contentPadding: EdgeInsets.symmetric(vertical: 0),
                                                        enabledBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        focusedBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        prefixIcon: Icon(Icons.calendar_month) ,
                                                        labelText: 'Start Date',
                                                        hintText: 'Start'),
                                                    readOnly: true,
                                                    onTap: () async {
                                                      DateTime? pickedDate = await showDatePicker(
                                                          context: context,
                                                          initialDate: DateFormat("MM-dd-yyyy").parse(extraDate.text),
                                                          firstDate: DateTime(1900),
                                                          lastDate: DateTime(2222)
                                                      );
                                                      if (pickedDate != null)
                                                      {
                                                        String formatDate = DateFormat("MM-dd-yyyy").format(pickedDate);
                                                        setState(() {
                                                          extraDate.text = formatDate;
                                                        });
                                                      }
                                                    },
                                                  ),
                                                ),
                                                Padding(
                                                  padding: EdgeInsets.symmetric(vertical: 8),
                                                  child: Row(
                                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                    children: <Widget>[
                                                      Container(
                                                        width: 230.0,
                                                        height: 52,
                                                        child: DropdownButtonFormField(
                                                          // alignment: Alignment.center,
                                                          decoration: InputDecoration(
                                                            contentPadding: EdgeInsets.symmetric(horizontal: 4),
                                                            focusColor: const Color(0xFF2D4B03),
                                                            enabledBorder: OutlineInputBorder(
                                                              borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                              borderRadius: BorderRadius.circular(50.0),
                                                            ),
                                                            focusedBorder: OutlineInputBorder(
                                                              borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                              borderRadius: BorderRadius.circular(50.0),
                                                            ),
                                                            prefixIcon: Icon(Icons.list),
                                                          ),
                                                          isDense: false,
                                                          // isExpanded: true,
                                                          iconSize: 24,
                                                          hint: Text('Choose Category'),
                                                          borderRadius: BorderRadius.circular(8),
                                                          dropdownColor: Color(0xFFE3E9E7),
                                                          style: TextStyle(color: Color(0xFF000000), fontSize: 16),
                                                          items: getAllCategories.map((item) {
                                                            return DropdownMenuItem<MyCategory>(
                                                              child: Text(item.name),
                                                              value: item,
                                                            );
                                                          }).toList(),
                                                          onChanged: (newVal) {
                                                            if (newVal != null)
                                                            {
                                                              setState(() {
                                                                categoryValue = newVal as MyCategory?;
                                                              });
                                                            }
                                                            print(categoryValue?.name);
                                                          },
                                                          value: categoryValue,
                                                        ),
                                                      ),
                                                      IconButton(
                                                        style: ButtonStyle(
                                                          foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                                                        ),
                                                        onPressed: ()  {
                                                          showAddCategory(context);
                                                        },
                                                        icon: Icon(Icons.add_circle),
                                                        iconSize: 40,
                                                        constraints: BoxConstraints(),
                                                        padding: EdgeInsets.zero,
                                                      ),
                                                    ],
                                                  ),
                                                ),

                                                const SizedBox(
                                                  height: 10.0,
                                                ),
                                                Container(
                                                  alignment: Alignment.center,
                                                  height: 50,
                                                  width: 180,
                                                  decoration: BoxDecoration(
                                                    color: const Color(0xFF020100), border: Border.all(width: 2, color: const Color(0xFF2D4B03)), borderRadius: BorderRadius.circular(20),
                                                  ),
                                                  child: TextButton(
                                                    style: ButtonStyle(
                                                      foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                                                    ),
                                                    onPressed: () async {
                                                      id = global.userId;
                                                      // ADD BUDGET
                                                      print(id);
                                                      if (extraName.text == "" || extraPrice.text == "" || extraDate.text == "")
                                                      {
                                                        _showToast("Fill fields", true);
                                                      }
                                                      else
                                                      {
                                                        var extra = MyExtra(
                                                          userId: id,
                                                          name: extraName.text,
                                                          price: num.parse(extraPrice.text),
                                                          categoryId: categoryValue?.id,
                                                          date: extraDate.text,
                                                        );
                                                        print(myExtraToJson(extra));
                                                        var response = await BaseClient().postExtra(extra).catchError((err) {print("Fail");});
                                                        if (response == null) {
                                                          _showToast("Could not add", true);
                                                          print("response null");
                                                        }

                                                        _showToast("Added", false);
                                                        print("success");
                                                      }

                                                      clearFields();
                                                      setState(() {
                                                        extraDate.text =  DateFormat("MM-dd-yyyy").format(DateTime.now());
                                                      });

                                                    },
                                                    child: const Text(
                                                      'Add Extra',
                                                      style: TextStyle(fontSize: 23, color: Color(0xFFE3E9E7), fontWeight: FontWeight.bold),
                                                    ),
                                                  ),
                                                ),
                                              ],
                                            ),
                                          )
                                      ),
                                      Visibility(
                                        visible: isSelected[3],
                                        child:  Padding(
                                          padding: EdgeInsets.symmetric(horizontal: 15),
                                          child: Column(
                                            children: [
                                              //  Budget name
                                              SizedBox(height: 20.0),
                                              Padding(
                                                //padding: const EdgeInsets.only(left:15.0,right: 15.0,top:0,bottom: 0),
                                                padding: const EdgeInsets.symmetric(vertical: 8),
                                                child: TextField(
                                                  controller: categoryAdd,
                                                  decoration: InputDecoration(
                                                      contentPadding: EdgeInsets.symmetric(vertical: 0),
                                                      focusColor: const Color(0xFF2D4B03),
                                                      enabledBorder: OutlineInputBorder(
                                                        borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                        borderRadius: BorderRadius.circular(50.0),
                                                      ),
                                                      focusedBorder: OutlineInputBorder(
                                                        borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                        borderRadius: BorderRadius.circular(50.0),
                                                      ),
                                                      prefixIcon: const Icon(Icons.list_alt_rounded),
                                                      labelText: 'Name',
                                                      hintText: 'Name'),
                                                ),
                                              ),
                                              const SizedBox( height: 10.0,),
                                              Container(
                                                alignment: Alignment.center,
                                                height: 50,
                                                width: 180,
                                                decoration: BoxDecoration(
                                                  color: const Color(0xFF020100), border: Border.all(width: 2, color: const Color(0xFF2D4B03)), borderRadius: BorderRadius.circular(20),
                                                ),
                                                child: TextButton(
                                                  style: ButtonStyle(
                                                    foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                                                  ),
                                                  onPressed: () async {
                                                    id = global.userId;
                                                    // ADD BUDGET
                                                    print(id);
                                                    if (categoryAdd.text == "")
                                                    {
                                                      _showToast("Fill field", true);
                                                    }
                                                    else
                                                    {
                                                      id = global.userId;
                                                      var cat = MyCategory(
                                                        userId: id,
                                                        name: categoryAdd.text,
                                                      );
                                                      print("Json");
                                                      print(myCategoryToJson(cat));
                                                      var response = await BaseClient().postCategory(cat).catchError((err) {print("Fail");});
                                                      if (response == null) {
                                                        _showToast("Could not get", true);
                                                        print("response null");
                                                      }
                                                      else {
                                                        print("Add Category");
                                                        print(id);
                                                        print(response);
                                                      }

                                                      _showToast("Added", false);
                                                      print("success");
                                                    }

                                                    clearFields();
                                                    getAllCat();

                                                  },
                                                  child: const Text(
                                                    'Add Category',
                                                    style: TextStyle(fontSize: 23, color: Color(0xFFE3E9E7), fontWeight: FontWeight.bold),
                                                  ),
                                                ),
                                              ),
                                              const SizedBox(height: 20.0,),
                                            ],
                                          ),
                                        ),
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
              )
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
