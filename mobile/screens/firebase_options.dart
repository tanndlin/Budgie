// File generated by FlutterFire CLI.
// ignore_for_file: lines_longer_than_80_chars, avoid_classes_with_only_static_members
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for windows - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyC7OHvwvqRgrOvgYoy2C5sgnXSZ02xLZPc',
    appId: '1:426012497735:web:7ed50d80324be477535e62',
    messagingSenderId: '426012497735',
    projectId: 'cop4331-large-project-27',
    authDomain: 'cop4331-large-project-27.firebaseapp.com',
    databaseURL: 'https://cop4331-large-project-27-default-rtdb.firebaseio.com',
    storageBucket: 'cop4331-large-project-27.appspot.com',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyDEUostgvwbZptd8xkRwyxbcKovOtQwBHs',
    appId: '1:426012497735:android:7372e4ec2423b1a9535e62',
    messagingSenderId: '426012497735',
    projectId: 'cop4331-large-project-27',
    databaseURL: 'https://cop4331-large-project-27-default-rtdb.firebaseio.com',
    storageBucket: 'cop4331-large-project-27.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyDshVqFZ-kwvkhs4gqzoEPV-gSKv4opzlU',
    appId: '1:426012497735:ios:074521442572b9f9535e62',
    messagingSenderId: '426012497735',
    projectId: 'cop4331-large-project-27',
    databaseURL: 'https://cop4331-large-project-27-default-rtdb.firebaseio.com',
    storageBucket: 'cop4331-large-project-27.appspot.com',
    iosClientId: '426012497735-vnb827f03f2q9qt9aa99601ng57dol3i.apps.googleusercontent.com',
    iosBundleId: 'com.group27.mobile',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyDshVqFZ-kwvkhs4gqzoEPV-gSKv4opzlU',
    appId: '1:426012497735:ios:2ec8ec21ff92ddb9535e62',
    messagingSenderId: '426012497735',
    projectId: 'cop4331-large-project-27',
    databaseURL: 'https://cop4331-large-project-27-default-rtdb.firebaseio.com',
    storageBucket: 'cop4331-large-project-27.appspot.com',
    iosClientId: '426012497735-g0k94ek9cqu7j732smogo1tutgkka3it.apps.googleusercontent.com',
    iosBundleId: 'group27',
  );
}