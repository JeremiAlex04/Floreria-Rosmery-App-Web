-- ================================================
-- DATOS DE EJEMPLO (SEED DATA) - CORREGIDO
-- Ejecuta esto para ver contenido en la web de inmediato
-- ================================================

-- 1. Insertar Productos Principales
INSERT INTO public.products (nombre, precio, categoria, imagen, description, stock, popular)
VALUES
('Ramo Amor Eterno', 89.00, 'Rosas', '/img/img-catalogo/C-Rosas.jpg', 'Hermoso ramo de juramento de amor eterno.', 50, true),
('Girasoles Radiantes', 75.00, 'Girasoles', '/img/img-catalogo/C-Cumpleaños.jpg', 'Ilumina su día con estos girasoles selectos.', 30, true),
('Tulipanes de Primavera', 120.00, 'Tulipanes', '/img/img-catalogo/C-Aniversario.jpg', 'Elegancia pura para momentos especiales.', 20, true),
('Orquídea Imperial', 150.00, 'Orquídeas', '/img/img-catalogo/C-Condolencias.jpg', 'Un detalle sofisticado y duradero.', 15, true);

-- 2. Insertar Banner de Promoción
INSERT INTO public.promotions (title, description, image_url, discount_text, "order")
VALUES
('Oferta de San Valentín', 'Descuentos exclusivos en arreglos de rosas rojas.', '/img/img-promocion/Promocion1.jpg', '20% OFF', 1);

-- 3. Insertar Testimonios
INSERT INTO public.testimonials (name, role, text, rating, avatar_url)
VALUES
('María Pérez', 'Cliente Frecuente', '¡Las flores llegaron fresquísimas y a tiempo! Me encantó el servicio.', 5, 'https://i.pravatar.cc/150?u=maria'),
('Juan Carlos', 'Comprador', 'Excelente presentación, mi esposa quedó fascinada. 100% recomendados.', 5, 'https://i.pravatar.cc/150?u=juan');

-- 4. Insertar Hero Slides (Carrusel) - RUTAS CORREGIDAS
INSERT INTO public.hero_slides (title, subtitle, button_text, button_link, image_url, "order")
VALUES
('Sorprende con Amor', 'Los mejores arreglos para esa persona especial', 'Ver Catálogo', '/catalogo', '/img/img-carrusel/foto1.jpg', 1),
('Flores Frescas', 'Directo del campo a tu hogar', 'Comprar Ahora', '/catalogo', '/img/img-carrusel/foto2.jpg', 2);
