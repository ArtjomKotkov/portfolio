"""empty message

Revision ID: 0166c5d76019
Revises: 
Create Date: 2020-08-12 01:36:00.024803

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0166c5d76019'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('projects', sa.Column('text', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('projects', 'text')
    # ### end Alembic commands ###