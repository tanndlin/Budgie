// api call functions
import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:mobile/global.dart' as global;
import 'package:mobile/models/budget.dart';
import 'package:mobile/models/get_profile.dart';

const String baseUrl = 'https://us-central1-cop4331-large-project-27.cloudfunctions.net/webApi';

// final String id = global.userId;

Map getData(String id) => {
  "userId": id
};

class BaseClient
{
  var client = http.Client();

  _setHeaders() => {
    'Content-type':'application/json',
    'Accept':'application/json'
  };

  // parameter budget object
  Future<dynamic> postBudget(dynamic object) async {
    var url = Uri.parse(baseUrl + '/CreateBudget');

    var _payload = jsonEncode(object);

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  // parameter user id
  Future<dynamic> getBudgets(String id) async {
    var url = Uri.parse(baseUrl + '/GetBudgets');

    var _payload = jsonEncode(getData(id));

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  // parameter budget object
  Future<dynamic> editBudget(Budget object) async {
    var url = Uri.parse(baseUrl + '/EditBudget');

    var _payload = budgetToJsonEdit(object);

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  Future<dynamic> postBill(dynamic object) async {
    var url = Uri.parse(baseUrl + '/CreateBill');

    var _payload = jsonEncode(object);

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    print(response.statusCode);
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  Future<dynamic> getCategories(String id) async {
    var url = Uri.parse(baseUrl + '/GetCategories');

    var _payload = jsonEncode(getData(id));

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  Future<dynamic> postCategory(dynamic object) async {
    var url = Uri.parse(baseUrl + '/CreateCategory');

    var _payload = jsonEncode(object);

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  Future<dynamic> getUserProfile(String id) async {
    var url = Uri.parse(baseUrl + '/GetUserProfile');
    var _payload = jsonEncode(id);
    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201 || response.statusCode == 200){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  Future<dynamic> createProfile(dynamic object) async {
    var url = Uri.parse(baseUrl + '/CreateUserProfile');

    var _payload = jsonEncode(object);

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    print(response.statusCode);
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }
}