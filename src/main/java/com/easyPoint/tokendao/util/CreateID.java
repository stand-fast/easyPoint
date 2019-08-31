package com.easyPoint.tokendao.util;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.springframework.stereotype.Component;
@Component
public class CreateID {
     public String getOrderIdByUUId(String uid) {
 		Date date = new Date();
 		SimpleDateFormat sdf = new SimpleDateFormat("MMddHH");
 		String d = sdf.format(date);
 		uid = "00000".substring(0, 5-uid.length())+uid;
    	SecureRandom sr = new SecureRandom();
    	String pir = sr.nextInt(100)+"";
    	for(int j=pir.length();j<2;j++)
    	 	pir = "0" + pir;
    	 	System.out.println(pir);
            int hashCodeV = UUID.randomUUID().toString().hashCode();
            if (hashCodeV < 0) {
                hashCodeV = -hashCodeV;
            }
            
            System.out.println(hashCodeV);
           
            return d+ String.format("%012d", hashCodeV)+uid+pir;
        }

}
