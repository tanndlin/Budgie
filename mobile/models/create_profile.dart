// To parse this JSON data, do
//
//     final welcome = welcomeFromJson(jsonString);

import 'dart:convert';
import 'dart:ffi';

CreateProfile welcomeFromJson(String str) => CreateProfile.fromJson(json.decode(str));

String welcomeToJson(CreateProfile data) => json.encode(data.toJson());

class CreateProfile {
  CreateProfile({
    required this.userId,
    required this.firstName,
    required this.lastName,
    required this.expectedIncome,
  });

  String userId;
  String firstName;
  String lastName;
  int expectedIncome;

  factory CreateProfile.fromJson(Map<String, dynamic> json) => CreateProfile(
    userId: json["userId"] as String,
    firstName: json["firstName"] as String,
    lastName: json["lastName"] as String,
    expectedIncome: json["expectedIncome"],
  );

  Map<String, dynamic> toJson() => {
    "userId": userId,
    "firstName": firstName,
    "lastName": lastName,
    "expectedIncome": expectedIncome,
  };
}
