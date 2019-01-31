package com.oc.captcha.validator.domain;

import lombok.Data;

import javax.persistence.*;

/**
 * @author SxL
 * @since 1.0.0
 * 2019-01-31 21:37
 */

@Data
@Entity
@Table(name = "training")
public class Captcha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String value;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(columnDefinition = "BLOB")
    private byte[] captcha;
}
