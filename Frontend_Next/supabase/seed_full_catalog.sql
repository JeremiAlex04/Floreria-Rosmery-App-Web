-- ================================================
-- MIGRACIÓN COMPLETA DEL CATÁLOGO (48 PRODUCTOS)
-- Ejecuta esto para tener TODOS los productos en la base de datos
-- ================================================

-- Limpiar productos existentes (opcional, para evitar duplicados)
-- DELETE FROM public.products;

INSERT INTO public.products (nombre, precio, categoria, imagen, popular, stock, description)
VALUES
-- 1. Aniversario
('Amor Eterno', 180.00, 'Aniversario', '/img/productos_nuevos/1.jpg', true, 10, 'Hermoso arreglo para ocasiones especiales.'),
('Dulce Compañía', 150.00, 'Aniversario', '/img/productos_nuevos/2.jpg', false, 10, 'Detalle perfecto para tu pareja.'),
('Promesa de Amor', 120.00, 'Aniversario', '/img/productos_nuevos/3.jpg', false, 10, 'Flores frescas para sellar una promesa.'),

-- 2. Arreglos en Caja
('Caja Sorpresa Rosa', 140.00, 'Arreglos en Caja', '/img/productos_nuevos/4.jpg', true, 10, 'Caja elegante con rosas seleccionadas.'),
('Box de Lujo Mix', 160.00, 'Arreglos en Caja', '/img/productos_nuevos/5.jpg', true, 10, 'Mezcla exclusiva en presentación de lujo.'),
('Caja Corazón Rojo', 130.00, 'Arreglos en Caja', '/img/productos_nuevos/6.jpg', false, 10, 'La forma perfecta de decir te amo.'),

-- 3. Bodas
('Ramo de Novia Imperial', 250.00, 'Bodas', '/img/productos_nuevos/7.jpg', true, 5, 'Diseño imperial para el gran día.'),
('Centro de Mesa Nupcial', 190.00, 'Bodas', '/img/productos_nuevos/8.jpg', false, 5, 'Decoración perfecta para la recepción.'),
('Arreglo Altar Pureza', 300.00, 'Bodas', '/img/productos_nuevos/9.jpg', true, 5, 'Blancos puros para el altar.'),

-- 4. Centros de Mesa
('Centro de Mesa Elegancia', 120.00, 'Centros de Mesa', '/img/productos_nuevos/10.jpg', false, 8, 'Toque de elegancia para tu mesa.'),
('Mesa Festiva Tropical', 95.00, 'Centros de Mesa', '/img/productos_nuevos/11.jpg', false, 8, 'Colores vibrantes para celebrar.'),
('Centro Floral Navideño', 110.00, 'Centros de Mesa', '/img/productos_nuevos/12.jpg', false, 8, 'Espíritu festivo en tu hogar.'),

-- 5. Condolencias
('Corona de Paz', 220.00, 'Condolencias', '/img/productos_nuevos/13.jpg', false, 5, 'Expresa tus condolencias con respeto.'),
('Lágrimas Blancas', 150.00, 'Condolencias', '/img/productos_nuevos/14.jpg', false, 5, 'Arreglo solemne en tonos blancos.'),
('Cruz de Rosas', 280.00, 'Condolencias', '/img/productos_nuevos/15.jpg', false, 5, 'Símbolo de fe y despedida.'),

-- 6. Cumpleaños
('Fiesta de Colores', 95.00, 'Cumpleaños', '/img/productos_nuevos/16.jpg', true, 15, 'Alegría y color para el cumpleañero.'),
('Feliz Día Sunshine', 85.00, 'Cumpleaños', '/img/productos_nuevos/17.jpg', true, 15, 'Brillante como un día de sol.'),
('Globo y Flores Pack', 110.00, 'Cumpleaños', '/img/productos_nuevos/18.jpg', false, 15, 'El combo perfecto de celebración.'),

-- 7. Día del Padre
('Caballero Azul', 120.00, 'Día del Padre', '/img/productos_nuevos/19.jpg', false, 10, 'Tonos sobrios y elegantes.'),
('Detalle Papá', 90.00, 'Día del Padre', '/img/productos_nuevos/20.jpg', false, 10, 'Un detalle especial para papá.'),
('Box Papá Especial', 150.00, 'Día del Padre', '/img/productos_nuevos/21.jpg', false, 10, 'Caja regalo con selección premium.'),

-- 8. Día de la Madre
('Reina de la Casa', 180.00, 'Día de la Madre', '/img/productos_nuevos/22.jpg', true, 20, 'Para la reina del hogar.'),
('Mamá Te Amo', 140.00, 'Día de la Madre', '/img/productos_nuevos/23.jpg', true, 20, 'Díselo con flores hermosas.'),
('Tulipanes para Mamá', 130.00, 'Día de la Madre', '/img/productos_nuevos/24.jpg', true, 20, 'Elegancia y amor en cada flor.'),

-- 9. Girasoles
('Rayo de Sol', 80.00, 'Girasoles', '/img/productos_nuevos/25.jpg', true, 12, 'Energía positiva instantánea.'),
('Jardín de Girasoles', 120.00, 'Girasoles', '/img/productos_nuevos/26.jpg', false, 12, 'Un campo de girasoles en casa.'),
('Girasoles y Rosas', 110.00, 'Girasoles', '/img/productos_nuevos/27.jpg', true, 12, 'La combinación perfecta.'),

-- 10. Graduaciones
('Logro Académico', 100.00, 'Graduaciones', '/img/productos_nuevos/28.jpg', false, 10, 'Celebra el esfuerzo y el éxito.'),
('Felicidades Graduado', 130.00, 'Graduaciones', '/img/productos_nuevos/29.jpg', false, 10, 'Un gran regalo para un gran logro.'),
('Pack Graduación', 150.00, 'Graduaciones', '/img/productos_nuevos/30.jpg', false, 10, 'Todo lo necesario para festejar.'),

-- 11. Orquídeas
('Orquídea Phalaenopsis', 160.00, 'Orquídeas', '/img/productos_nuevos/31.jpg', true, 8, 'Dura meses, hermosa siempre.'),
('Orquídea Doble Vara', 200.00, 'Orquídeas', '/img/productos_nuevos/32.jpg', false, 8, 'Doble belleza, doble impacto.'),
('Orquídea Mini Púrpura', 90.00, 'Orquídeas', '/img/productos_nuevos/33.jpg', false, 8, 'Pequeña joya natural.'),

-- 12. Ramos de Mano
('Ramo Silvestre', 70.00, 'Ramos de Mano', '/img/productos_nuevos/34.jpg', false, 15, 'Fresco y natural.'),
('Mix de Estación', 60.00, 'Ramos de Mano', '/img/productos_nuevos/35.jpg', true, 15, 'Lo mejor de la temporada.'),
('Ramo Pastel', 75.00, 'Ramos de Mano', '/img/productos_nuevos/36.jpg', false, 15, 'Tonos suaves y delicados.'),

-- 13. Ramos Premium
('Gran Lujo Floral', 350.00, 'Ramos Premium', '/img/productos_nuevos/37.jpg', true, 5, 'Impresionante tamaño y calidad.'),
('Elegancia Absoluta', 280.00, 'Ramos Premium', '/img/productos_nuevos/38.jpg', true, 5, 'Sofisticación en cada pétalo.'),
('Premium Mix 100', 400.00, 'Ramos Premium', '/img/productos_nuevos/39.jpg', true, 5, '100 tallos de pura belleza.'),

-- 14. Rosas
('24 Rosas Rojas', 140.00, 'Rosas', '/img/productos_nuevos/40.jpg', true, 20, 'El clásico que nunca falla.'),
('Bouquet Rosas Blancas', 130.00, 'Rosas', '/img/productos_nuevos/41.jpg', false, 20, 'Pureza y elegancia.'),
('Rosas y Chocolates', 160.00, 'Rosas', '/img/productos_nuevos/42.jpg', true, 20, 'Dulzura y romance.'),

-- 15. San Valentín
('Cupido Pack', 200.00, 'San Valentín', '/img/productos_nuevos/43.jpg', true, 25, 'Flecha directa al corazón.'),
('Te Amo Gigante', 250.00, 'San Valentín', '/img/productos_nuevos/44.jpg', true, 25, 'Dilo a lo grande.'),
('Dulce San Valentín', 120.00, 'San Valentín', '/img/productos_nuevos/45.jpg', true, 25, 'Detalle tierno para tu amor.'),

-- 16. Tulipanes
('10 Tulipanes Rojos', 90.00, 'Tulipanes', '/img/productos_nuevos/46.jpg', true, 15, 'Pasión en forma de tulipán.'),
('Tulipanes Multicolores', 95.00, 'Tulipanes', '/img/productos_nuevos/47.jpg', true, 15, 'Alegría multicolor.'),
('Tulipanes Amarillos', 90.00, 'Tulipanes', '/img/productos_nuevos/48.jpg', false, 15, 'Luz y amistad.');
