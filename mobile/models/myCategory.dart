import 'dart:convert';

String findCategory(List<MyCategory> list, String? id)
{
  String ret = "";

  if (id == null)
    return ret;

  for (var i = 0; i < list.length; i++)
  {
    if (list[i].id == id)
    {
      // ret = list[i].name;
      return list[i].name;
    }
  }
  return ret;
}

MyCategory? getCategory(List<MyCategory> list, String? id)
{
  MyCategory sample = MyCategory(name: "sample");
  if (id == "-1")
    return sample;
  if (id == null)
    return null;

  for (var i = 0; i < list.length; i++)
  {
    if (list[i].id == id)
    {
      // ret = list[i].name;
      return list[i];
    }
  }
  return null;
}

List<MyCategory> getCategoriesFromJson(String str) {
  final jsonData = jsonDecode(str);
  List<MyCategory> result = <MyCategory>[];
  print(jsonData);
  // jsonData["categories"].forEach((v) {print(v); print(jsonEncode(v));});

  jsonData["categories"].forEach((v) {
    String json = jsonEncode(v);
    result.add(myCategoryFromJson(json));

  });
  // for (Budget b in result) print(b.name);

  return result;
}

MyCategory myCategoryFromJson(String str) => MyCategory.fromJson(json.decode(str));

String myCategoryToJson(MyCategory data) => json.encode(data.toJson());

class MyCategory {
  MyCategory({
    this.userId,
    required this.name,
    this.id,
  });

  String? userId;
  String name;
  String? id;

  factory MyCategory.fromJson(Map<String, dynamic> json) => MyCategory(
    name: json["name"],
    id: json["id"],
  );

  Map<String, dynamic> toJson() => {
    "userId": userId,
    "name": name,
  };

}
