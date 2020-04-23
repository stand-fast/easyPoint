package com.easyPoint.utils;

import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

/**
 * @author FHJ
 * @date 2020/4/17 17:04
 */
public class UploadUtil {

    public static String imageUpload(MultipartFile file, HttpServletRequest request) {
        // 图片存放位置
        String path = "C:\\Users\\Administrator\\Desktop\\web\\apache-tomcat-9.0.17\\webapps\\images";
        // 获取文件扩展名
        String ext = FilenameUtils.getExtension(file.getOriginalFilename());
        // 创建文件名
        String fileName = UUID.randomUUID().toString().replaceAll("-", "") + "." + ext;

        File targetFile = new File(path, fileName);

        try {
            if (!targetFile.exists()) {
                // 写入文件
                file.transferTo(targetFile);
            }
            return fileName;
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 图片上传失败
        return "failure";
    }
}
