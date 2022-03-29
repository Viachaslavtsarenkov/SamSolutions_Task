package by.tsarenkov.service.util;

import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Component
public class PictureLoader {

    private String FILE_PATH = "/images/%s.jpg";
    private String DEFAULT_FILE_PATH = "/images/default.jpg";

    public String loadPicture(MultipartFile image) {
        String result = null;
        try{
            byte[] byteImage = Base64.encodeBase64(image.getBytes());
            result = new String(byteImage);
            System.out.println(result);
        } catch(Exception e) {
            e.printStackTrace();
        }
        return result;
    }

}
