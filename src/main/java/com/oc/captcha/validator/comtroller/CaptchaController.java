package com.oc.captcha.validator.comtroller;

import com.oc.captcha.validator.domain.Captcha;
import com.oc.captcha.validator.repository.CaptchaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * @author SxL
 * @since 1.0.0
 * 2019-01-31 21:42
 */
@RestController
@RequestMapping("/captcha")
public class CaptchaController {

    private final CaptchaRepository captchaRepository;

    private int result;

    @Autowired
    public CaptchaController(CaptchaRepository captchaRepository) {
        this.captchaRepository = captchaRepository;
    }

    @GetMapping(value = "/{captchaId}")
    public Captcha getCaptchaById(@PathVariable Integer captchaId) {
        Optional<Captcha> captcha = captchaRepository.findById(captchaId);
        return captcha.orElse(null);
    }

    @PatchMapping("/{captchaId}")
    public ResponseEntity modifyCaptchaValueById(@RequestBody String value, @PathVariable Integer captchaId) {
        result = captchaRepository.updateValueOnly(value, captchaId);

        if (result == 1) {
            return ResponseEntity.ok(getCaptchaById(captchaId));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
