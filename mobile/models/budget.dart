import 'dart:convert';

Budget budgetFromJson(String str) => Budget.fromJson(json.decode(str));

String budgetToJson(Budget data) => json.encode(data.toJson());

class Budget {
  Budget({
    required this.userId,
    required this.name,
    this.categoryId,
    required this.expectedPrice,
    required this.actualPrice,
    this.startDate,
  });

  String userId;
  String name;
  String? categoryId;
  int expectedPrice;
  int actualPrice;
  String? startDate;

  factory Budget.fromJson(Map<String, dynamic> json) => Budget(
    userId: json["userId"],
    name: json["name"],
    categoryId: json["categoryId"],
    expectedPrice: json["expectedPrice"],
    actualPrice: json["actualPrice"],
    startDate: json["startDate"],
  );

  Map<String, dynamic> toJson() => {
    "userId": userId,
    "name": name,
    "categoryId": categoryId ?? "-1",
    "expectedPrice": expectedPrice,
    "actualPrice": actualPrice,
    "startDate": startDate ?? "-1",
  };
}
