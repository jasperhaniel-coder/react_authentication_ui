import "./AuthLayout.css";

// Every of my auth page (login, register, forgot password, etc.) is wrapped
// in this component so they all share the same card, same brand
// mark, and the same spacing. The `title` and `subtitle` change per page;
// `children` is whatever form that specific page renders inside the
// card.
const AuthLayout = ({ title, subtitle, children, footer }) => {
  return (
    <div className="auth-shell">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-9 col-md-7 col-lg-5">
            <div className="auth-card">
              <div className="auth-brand">
                <span className="auth-brand-mark">HanielStores</span>
              </div>
              <h1 className="auth-title">{title}</h1>
              {subtitle && <p className="auth-subtitle">{subtitle}</p>}
              <div className="auth-body">{children}</div>
              {footer && <div className="auth-footer">{footer}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
