// api call functions
import 'dart:convert';

import 'package:http/http.dart' as http;

const String baseUrl = 'https://us-central1-cop4331-large-project-27.cloudfunctions.net/webApi';

class BaseClient
{
  var client = http.Client();

  _setHeaders() => {
    'Content-type':'application/json',
    'Accept':'application/json'
  };

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

  Future<dynamic> postBill(dynamic object) async {
    var url = Uri.parse(baseUrl + '/CreateBill');

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
}