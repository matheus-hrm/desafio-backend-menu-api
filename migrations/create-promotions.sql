CREATE TABLE IF NOT EXISTS promotions (
    id CHAR(36) PRIMARY KEY,
    product_id CHAR(36) NOT NULL,
    description VARCHAR(255) NOT NULL,
    promotional_price DECIMAL(10, 2) NOT NULL,
    active_days SET('Mon','Tue','Wed','Thu','Fri','Sat','Sun') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_promotions_product
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT chk_promo_time_range CHECK (start_time < end_time),
    CONSTRAINT chk_promo_start_minutes CHECK (MOD(MINUTE(start_time), 15) = 0),
    CONSTRAINT chk_promo_end_minutes CHECK (MOD(MINUTE(end_time), 15) = 0)
);
