package by.tsarenkov.service.util;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Component
public class PictureLoader {

    private String FILE_PATH = "/images/%s.jpg";
    private String DEFAULT_FILE_PATH = "/images/default.jpg";

    public String loadPicture(MultipartFile image, String imageName) {
        File dest;
        try {
            if(image == null) {
                imageName = DEFAULT_FILE_PATH;
            } else {
                String fileBookName = CodeGenerator.generateCode();
                imageName = String.format(FILE_PATH, fileBookName);
                dest = new File(imageName);
                image.transferTo(dest);
            }
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return imageName;
    }

}
