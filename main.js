import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Введите выражение (два числа и операцию между ними):");
        String input = scanner.nextLine();

        try {
            String result = calc(input);
            System.out.println(result);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    public static String calc(String input) throws Exception {
        String[] parts = input.split(" ");
        if (parts == null || parts.length != 3) {
            throw new Exception("Неверный формат выражения");
        }

        String num1Str = parts[0];
        String num2Str = parts[2];

        if (num1Str == null || num2Str == null) {
            throw new Exception("Неверный формат чисел");
        }

        int num1, num2;
        try {
            num1 = Integer.parseInt(num1Str);
            num2 = Integer.parseInt(num2Str);
        } catch (NumberFormatException e) {
            if (isRomanNumeral(num1Str) && isRomanNumeral(num2Str)) {
                num1 = romanToArabic(num1Str);
                num2 = romanToArabic(num2Str);
            } else {
                throw new Exception("Неверный формат чисел");
            }
        }

        if (num1 < 1 || num1 > 10 || num2 < 1 || num2 > 10) {
            throw new Exception("Числа должны быть от 1 до 10");
        }

        char operation = parts[1].charAt(0);
        int result;
        switch (operation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 == 0) {
                    throw new Exception("Деление на ноль запрещено");
                }
                result = num1 / num2;
                break;
            default:
                throw new Exception("Неверная операция");
        }

        if (parts[0] != null && isRomanNumeral(parts[0])) {
            return String.valueOf(arabicToRoman(result));
        } else {
            return String.valueOf(result);
        }
    }

    private static boolean isRomanNumeral(String str) {
        return str.matches("^[IVXLCDM]+$");
    }

    private static int romanToArabic(String roman) {
        int result = 0;
        for (int i = 0; i < roman.length(); i++) {
            char ch = roman.charAt(i);
            int value = 0;
            switch (ch) {
                case 'I':
                    value = 1;
                    break;
                case 'V':
                    value = 5;
                    break;
                case 'X':
                    value = 10;
                    break;
                case 'L':
                    value = 50;
                    break;
                case 'C':
                    value = 100;
                    break;
                case 'D':
                    value = 500;
                    break;
                case 'M':
                    value = 1000;
                    break;
            }
            if (i + 1 < roman.length() && value < romanToArabic(String.valueOf(roman.charAt(i + 1)))) {
                result -= value;
            } else {result += value;
            }
        }
        return result;
    }

    private static String arabicToRoman(int arabic) {
        StringBuilder roman = new StringBuilder();
        while (arabic >= 1000) {
            roman.append('M');
            arabic -= 1000;
        }
        while (arabic >= 900) {
            roman.append("CM");
            arabic -= 900;
        }
        while (arabic >= 500) {
            roman.append('D');
            arabic -= 500;
        }
        while (arabic >= 400) {
            roman.append("CD");
            arabic -= 400;
        }
        while (arabic >= 100) {
            roman.append('C');
            arabic -= 100;
        }
        while (arabic >= 90) {
            roman.append("XC");
            arabic -= 90;
        }
        while (arabic >= 50) {
            roman.append('L');
            arabic -= 50;
        }
        while (arabic >= 40) {
            roman.append("XL");
            arabic -= 40;
        }
        while (arabic >= 10) {
            roman.append('X');
            arabic -= 10;
        }
        while (arabic >= 9) {
            roman.append("IX");
            arabic -= 9;
        }
        while (arabic >= 5) {
            roman.append('V');
            arabic -= 5;
        }
        while (arabic >= 4) {
            roman.append("IV");
            arabic -= 4;
        }
        while (arabic >= 1) {
            roman.append('I');
            arabic -= 1;
        }
        return roman.toString();
    }
}
