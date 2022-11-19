import 'dart:convert';

List<Budget> getBudgetsFromJson(String str) {
  final jsonData = jsonDecode(str);
  List<Budget> result = <Budget>[];
  print(jsonData);
  jsonData["budgets"].forEach((v) {print(v); print(jsonEncode(v));});

  jsonData["budgets"].forEach((v) {
    String json = jsonEncode(v);
    result.add(budgetFromJson(json));

  });
  // for (Budget b in result) print(b.name);

  return result;
}

Budget budgetFromJson(String str) => Budget.fromJson(json.decode(str));

String budgetToJson(Budget data) => json.encode(data.toJson());

class Budget {
  Budget({
    this.userId,
    required this.name,
    this.categoryId,
    required this.expectedPrice,
    required this.actualPrice,
    this.startDate,
    this.id,
  });

  String? userId;
  String name;
  String? categoryId;
  int expectedPrice;
  int actualPrice;
  String? startDate;
  String? id;

  factory Budget.fromJson(Map<String, dynamic> json) => Budget(
    name: json["name"] as String,
    categoryId: json["categoryId"] as String,
    expectedPrice: json["expectedPrice"] as int,
    actualPrice: json["actualPrice"] as int,
    startDate: json["startDate"] as String,
    id: json["id"] as String,
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
