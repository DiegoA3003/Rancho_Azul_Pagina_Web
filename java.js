document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // DECLARACIÓN DE ELEMENTOS DEL DOM
    // =========================================
    // 1. Elemento principal para verificar si estamos en la página de reservas
    const modal = document.getElementById('reservation-modal');
    
    // Si el modal existe, inicializamos toda la lógica de reserva.
    if (modal) {
        
        // Elementos de Manejo del Modal
        const openModalBtn = document.getElementById('open-modal-btn');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const modalBackdrop = document.getElementById('modal-backdrop');
        
        // Elementos del Formulario y Mensajes (CRÍTICO: Selector por ID)
        // Nota: Asegúrate de que el botón de HTML tenga id="check-availability-btn"
        const checkAvailabilityButton = document.getElementById('check-availability-btn'); 
        const statusMessage = document.getElementById('status-message');
        const errorMessage = document.getElementById('error-message');
        const personalDataSection = document.getElementById('personal-data-section'); 
        const reservationForm = document.getElementById('reservation-form-modal');
        

        // =========================================
        // MANEJO DEL MODAL
        // =========================================
        function openModal() {
            modal.classList.remove('hidden');
            
            // 1. Restablece el mensaje de estado inicial
            if (statusMessage) {
                statusMessage.textContent = 'Presiona "Comprobar Disponibilidad" para verificar mesas.';
                statusMessage.style.backgroundColor = '#d4edda'; 
                statusMessage.style.color = '#155724'; 
                statusMessage.classList.remove('hidden'); 
            }
            
            // 2. Oculta el error y la sección de datos personales
            if (errorMessage) {
                errorMessage.classList.add('hidden');
            }
            if (personalDataSection) {
                personalDataSection.classList.add('hidden');
            }
            
            // 3. Limpia los campos del formulario
            if (reservationForm) {
                reservationForm.reset();
            }
        }

        function closeModal() {
            modal.classList.add('hidden');
        }

        // Event Listeners para Abrir/Cerrar
        if (openModalBtn) {
            openModalBtn.addEventListener('click', function(e) {
                e.preventDefault(); 
                openModal();
            });
        }
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', closeModal);
        }
        document.addEventListener('keydown', function(event) {
            if (event.key === "Escape" && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });

        // =========================================
        // LÓGICA DE SIMULACIÓN DE DISPONIBILIDAD
        // =========================================
        if (checkAvailabilityButton) {
            checkAvailabilityButton.addEventListener('click', function(e) {
                e.preventDefault(); 
    
                // Oculta mensajes anteriores y datos personales
                statusMessage.classList.add('hidden');
                errorMessage.classList.add('hidden');
                personalDataSection.classList.add('hidden'); 
    
                // Obtener valores de los inputs
                const hora = document.getElementById('hora').value;
                const fechaInput = document.getElementById('fecha').value;
                const clientes = parseInt(document.getElementById('clientes').value);
    
                // Validación mínima de campos
                if (!hora || !fechaInput || isNaN(clientes) || clientes < 1) {
                    errorMessage.textContent = '⛔ Por favor, introduce la fecha, hora y un número de clientes válido (mínimo 1).';
                    errorMessage.classList.remove('hidden');
                    return;
                }
    
                // Lógica para determinar si es fin de semana (Domingo=0, Sábado=6)
                // Se agrega 'T00:00:00' para asegurar que la fecha sea interpretada como UTC y funcione en todos los navegadores
                const fecha = new Date(fechaInput + 'T00:00:00'); 
                const dayOfWeek = fecha.getUTCDay(); 
                const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
                
                // REGLAS DE SIMULACIÓN:
                if ((isWeekend && hora >= '20:30') || clientes > 8) {
                    
                    // NO DISPONIBLE
                    errorMessage.textContent = '❌ Lo sentimos, no hay disponibilidad para estas condiciones.';
                    errorMessage.classList.remove('hidden'); 
                    
                } else {
                    
                    // DISPONIBLE
                    statusMessage.classList.remove('hidden');
                    statusMessage.textContent = '✅ ¡Disponibilidad Confirmada! Completa tus datos para finalizar la reserva.';
                    statusMessage.style.backgroundColor = '#d4edda'; 
                    statusMessage.style.color = '#155724'; 
                    
                    // Muestra la sección de datos personales
                    personalDataSection.classList.remove('hidden'); 
                }
            });
        }
        
        // =========================================
        // LÓGICA DE SIMULACIÓN DE CONFIRMACIÓN DE RESERVA
        // =========================================
        if (reservationForm) {
            reservationForm.addEventListener('submit', function(e) {
                e.preventDefault(); 
                
                // Oculta mensajes anteriores
                statusMessage.classList.add('hidden');
                errorMessage.classList.add('hidden');
                personalDataSection.classList.add('hidden');
    
                // Simulación de envío exitoso
                statusMessage.textContent = '🎉 ¡Reserva Confirmada con Éxito! Recibirás un correo de confirmación pronto.';
                statusMessage.style.backgroundColor = '#d1e7dd'; 
                statusMessage.style.color = '#0f5132'; 
                statusMessage.classList.remove('hidden'); 
                
                // Retrasar el cierre del modal para que el usuario lea el mensaje
                setTimeout(closeModal, 3000); 
            });
        }
    } // CIERRE: if (modal)
    
    
    // =========================================
    // LÓGICA DE NAVEGACIÓN (Para index.html)
    // =========================================
    // Si NO hay modal en la página (es decir, estamos en index.html o similar)
    if (!modal) {
        const indexOpenBtn = document.getElementById('open-modal-btn');
        if (indexOpenBtn) {
            indexOpenBtn.addEventListener('click', function(e) {
                // Previene la navegación si se usa <a> con href="#"
                e.preventDefault(); 
                // Redirige a la página de reservas
                window.location.href = 'reservas.html';
            });
        }
    }

});