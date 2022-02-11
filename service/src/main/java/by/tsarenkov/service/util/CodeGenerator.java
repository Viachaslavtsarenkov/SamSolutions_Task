package by.tsarenkov.service.util;

import java.util.Random;

public class CodeGenerator {

    private static final String codeSymbols= "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    public static String generateCode() {
        Random rnd = new Random();
        final StringBuilder code = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            code.append(codeSymbols.charAt(rnd.nextInt(codeSymbols.length())));
        }
        return code.toString();
    }
}
