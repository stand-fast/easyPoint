package com.easyPoint.controller.administrator.business;

import com.easyPoint.dto.Result;
import com.easyPoint.utils.UploadUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * @author FHJ
 * @date 2020/4/17 17:38
 */
@CrossOrigin
@Controller
@RequestMapping("/administrator")
public class ImagesUploadController {

    @RequestMapping(value = "/imagesUpload", method = RequestMethod.POST)
    @ResponseBody
    public Result imagesUpload(MultipartFile[] file, HttpServletRequest request) {
        Result<Map> result = new Result<>();
        String imgUrl = "";
        for (int i = 0; i < file.length; i++){
            if (i > 0){
                imgUrl += "&";
            }
            String url = UploadUtil.imageUpload(file[i], request);
            imgUrl += url;
            if (url.equals("") || url.equals("failure")) {
                result.setCode(-1);
                result.setMessage("图片上传失败");
                return result;
            }
        }

        if (imgUrl.equals("")) {
            result.setCode(-1);
            result.setMessage("图片上传失败");
        } else {
            result.setCode(1);
            result.setMessage("图片上传成功");
            Map<String, String> map = new HashMap<>(1);
            map.put("imgUrl", imgUrl);
            result.setData(map);
        }
        return result;
    }
}
