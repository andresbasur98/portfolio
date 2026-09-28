import Image from "next/image";
import { testimonials } from "../data/portfolio";

export function TestimonialsSection() {
  return (
    <section className="section testimonials-section" id="testimonios" aria-labelledby="testimonials-title">
      <div className="testimonials-heading">
        <p className="eyebrow">Clientes y colaboraciones</p>
        <h2 id="testimonials-title">Lo que queda después de entregar.</h2>
        <p>
          Un espacio para reunir opiniones reales de personas con las que he construido
          productos, posicionamiento y sistemas de crecimiento.
        </p>
        <a className="button button-primary" href="#contacto">Hablemos de tu proyecto <span aria-hidden="true">↗</span></a>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <article className="testimonial-card" key={testimonial.project}>
            <div className="testimonial-person">
              <div className="testimonial-image">
                <Image
                  src={testimonial.image}
                  alt={testimonial.imageAlt}
                  fill
                  sizes="(min-width: 768px) 144px, 96px"
                />
              </div>
              <div>
                <span className="testimonial-index">0{index + 1} · Cliente</span>
                <h3>{testimonial.name}</h3>
                <p>{testimonial.project}</p>
              </div>
            </div>
            <div className="testimonial-context">{testimonial.context}</div>
            <blockquote>
              <span aria-hidden="true">“</span>
              <p>{testimonial.quote}</p>
            </blockquote>
          </article>
        ))}
      </div>
    </section>
  );
}
