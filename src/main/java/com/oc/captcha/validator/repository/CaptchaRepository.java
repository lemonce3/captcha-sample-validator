package com.oc.captcha.validator.repository;

import com.oc.captcha.validator.domain.Captcha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;


/**
 * @author SxL
 * @since 1.0.0
 * 2019-01-31 21:42
 */
public interface CaptchaRepository extends JpaRepository<Captcha, Integer> {

    /**
     * 只更新 {@link Captcha} 的 value 字段
     * @param value 验证码值
     * @param id ID
     * @return 更新后的 {@link Captcha}
     */
    @Transactional(rollbackFor = SQLException.class)
    @Modifying
    @Query("update Captcha c set c.value = :value where c.id = :id")
    Integer updateValueOnly(@Param("value") String value, @Param("id") Integer id);

}
