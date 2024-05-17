import './ListItem.css';

export default function ListItem({ icon, title, description, actions }) {
  return (
    <p className="list-item">
      {icon && <span className="icon">{icon}</span>}
      <div className="list-item-text">
        <span className="title">{title}</span>
        {description && <p className="description">{description}</p>}
      </div>
      {actions && <span>{actions}</span>}
    </p>
  );
}
