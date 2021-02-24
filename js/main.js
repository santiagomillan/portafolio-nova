const grid = new Muuri('.grid', {
	layout: {
		rounding: false
	}
});

window.addEventListener('load', () => {
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('imagenes-cargadas');

    const enlaces = document.querySelectorAll('#categorias a');

    enlaces.forEach( (elemento) => {
        //console.log(elemento);
        elemento.addEventListener('click',(evento)=>{
            evento.preventDefault();
            enlaces.forEach((enlace)=>{
                enlace.classList.remove('activo')
            })
            evento.target.classList.add('activo');

            const categoria = evento.target.innerHTML;
            //console.log(categoria);
            categoria === 'Todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria = "${categoria}"]`);
        });
    });
    //agregar listener para la barra de busqueda 
    document.querySelector('#barra-busqueda').addEventListener('input',(evento) => {
        const busqueda =evento.target.value;
        //console.log(busqueda);
        grid.filter((item)=>item.getElement().dataset.etiquetas.includes(busqueda));
    });

    //agregar listener para las imagenes
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento) =>{
       
        //console.log(descripcion);
        elemento.addEventListener('click' ,()=>{
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        });
    });
    //event listener boton cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click', ()=>{
        overlay.classList.remove('activo')
    });
    //overlay cerrar
    overlay.addEventListener('click',(evento) =>{
        evento.target.id=== 'overlay' ? overlay.classList.remove('activo') : '';
    });
});